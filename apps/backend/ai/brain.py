from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain.memory import ConversationBufferWindowMemory
from langchain_core.tools import BaseTool
from langchain_core.documents import Document
from typing import List, Tuple, TypedDict, Annotated, Any
import operator

from ..config import settings
from .memory import get_conversation_memory, get_vector_memory
from .tools_registry import get_all_faliz_tools
from .prompts import FALIZ_SYSTEM_PROMPT

class AgentState(TypedDict):
    input: str
    chat_history: Annotated[List[BaseMessage], operator.add]
    agent_outcome: Any
    intermediate_steps: Annotated[List[Tuple[BaseTool, str]], operator.add]

class FalizBrain:
    def __init__(self):
        self.llm = ChatOpenAI(
            model=settings.OPENAI_MODEL,
            temperature=0.7,
            api_key=settings.OPENAI_API_KEY,
            streaming=True
        )
        self.tools = get_all_faliz_tools()
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", FALIZ_SYSTEM_PROMPT),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ])
        self.agent = create_openai_tools_agent(self.llm, self.tools, self.prompt)
        self.agent_executor = AgentExecutor(agent=self.agent, tools=self.tools, verbose=True)
        self.conversation_memory = get_conversation_memory()
        self.vector_memory = get_vector_memory()

    async def process_message(self, user_message: str, session_id: str) -> str:
        # Load conversation history for the session
        history = self.conversation_memory.load_memory_variables({"session_id": session_id}).get("history", [])
        chat_history = [HumanMessage(content=msg.content) if msg.type == "human" else AIMessage(content=msg.content) for msg in history]

        # Add user message to history
        chat_history.append(HumanMessage(content=user_message))

        # Invoke the agent
        try:
            response = await self.agent_executor.invoke({
                "input": user_message,
                "chat_history": chat_history,
            })
            ai_response = response["output"]
        except Exception as e:
            print(f"Error invoking agent: {e}")
            ai_response = "I apologize, but I encountered an error while processing your request."
            # Optionally, log the error to vector memory for future analysis
            await self.vector_memory.add_documents([Document(page_content=f"Error processing user message: {user_message}. Error: {e}")])

        # Save conversation history
        self.conversation_memory.save_context(
            {"session_id": session_id, "human_message": user_message},
            {"ai_message": ai_response}
        )

        # Add to long-term memory (vector store) for context retrieval
        await self.vector_memory.add_documents([Document(page_content=f"User: {user_message}\nFaliz: {ai_response}")])

        return ai_response

    async def get_relevant_context(self, query: str, session_id: str, k: int = 3) -> List[str]:
        # Retrieve relevant documents from vector store
        docs = await self.vector_memory.as_retriever(search_kwargs={"k": k}).get_relevant_documents(query)
        return [doc.page_content for doc in docs]

faliz_brain = FalizBrain()
