from langchain.memory import ConversationBufferWindowMemory
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from typing import List

from ..config import settings

# Conversation Buffer Memory
def get_conversation_memory() -> ConversationBufferWindowMemory:
    return ConversationBufferWindowMemory(
        k=settings.CONVERSATION_MEMORY_K, # Number of previous interactions to keep
        return_messages=True,
        memory_key="chat_history",
        input_key="input"
    )

# Vector Store for Long-Term Memory
def get_vector_memory() -> Chroma:
    embeddings = OpenAIEmbeddings(api_key=settings.OPENAI_API_KEY, model=settings.OPENAI_EMBEDDING_MODEL)
    # In a real application, you would connect to a persistent ChromaDB instance
    # For simplicity, this example uses an in-memory client. 
    # You would configure ChromaDB client to connect to settings.CHROMA_HOST and settings.CHROMA_PORT
    return Chroma(embedding_function=embeddings)
