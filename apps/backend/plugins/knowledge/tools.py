from langchain_core.tools import tool
from typing import Dict, Any, List

from ..config import settings

@tool
async def search_wikipedia_tool(query: str) -> str:
    """Searches Wikipedia for information related to the query and returns a summary.
    Args:
        query (str): The search query for Wikipedia.
    """
    # Placeholder for actual Wikipedia API call
    return f"Summary of Wikipedia search for \'{query}\': Wikipedia provides information on {query} including its history, uses, and related concepts."

@tool
async def wolfram_alpha_query_tool(query: str) -> str:
    """Queries Wolfram Alpha for computational knowledge and factual answers.
    Args:
        query (str): The query to send to Wolfram Alpha.
    """
    if not settings.WOLFRAM_ALPHA_APP_ID:
        return "Wolfram Alpha API ID is not configured."
    
    # Placeholder for actual Wolfram Alpha API call
    return f"Wolfram Alpha result for \'{query}\': The answer to {query} is a complex calculation that requires advanced mathematics."

@tool
async def get_news_headlines_tool(category: str = None, country: str = "us", max_results: int = 5) -> List[Dict[str, Any]]:
    """Retrieves current news headlines, optionally filtered by category and country.
    Args:
        category (str, optional): The news category (e.g., 'technology', 'sports'). Defaults to None.
        country (str, optional): The 2-letter ISO 3166-1 code of the country (e.g., 'us', 'gb'). Defaults to 'us'.
        max_results (int, optional): The maximum number of headlines to retrieve. Defaults to 5.
    """
    if not settings.NEWS_API_KEY:
        return {"error": "News API key is not configured."}
    
    # Placeholder for actual News API call
    mock_news = [
        {"title": "AI Breakthrough in Medical Diagnosis", "source": "Tech News", "url": "https://example.com/ai-news"},
        {"title": "Global Markets React to Economic Data", "source": "Financial Times", "url": "https://example.com/finance-news"},
    ]
    return mock_news[:max_results]

def get_knowledge_tools():
    return [search_wikipedia_tool, wolfram_alpha_query_tool, get_news_headlines_tool]
