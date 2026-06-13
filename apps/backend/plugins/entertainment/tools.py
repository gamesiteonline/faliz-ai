from langchain_core.tools import tool
from typing import Dict, Any, List

from ..config import settings

@tool
async def play_music_tool(song_title: str, artist: str = None) -> str:
    """Plays a specified song using the entertainment plugin (e.g., Spotify integration).
    Args:
        song_title (str): The title of the song to play.
        artist (str, optional): The artist of the song. Defaults to None.
    """
    if not settings.PLUGIN_ENTERTAINMENT_ENABLED:
        return "Entertainment plugin is not enabled."
    
    # Placeholder for actual music playback logic (e.g., Spotify API)
    if artist:
        print(f"Playing {song_title} by {artist}")
        return f"Now playing {song_title} by {artist} on Spotify."
    else:
        print(f"Playing {song_title}")
        return f"Now playing {song_title} on Spotify."

@tool
async def get_movie_info_tool(movie_title: str) -> Dict[str, Any]:
    """Retrieves information about a specified movie.
    Args:
        movie_title (str): The title of the movie to get information about.
    """
    if not settings.PLUGIN_ENTERTAINMENT_ENABLED:
        return {"error": "Entertainment plugin is not enabled."}
    
    # Placeholder for actual movie info API (e.g., TMDb)
    return {
        "title": movie_title,
        "director": "Mock Director",
        "year": 2023,
        "genre": "Action",
        "plot": "A thrilling story about a hero saving the world.",
        "rating": 7.5,
    }

@tool
async def get_youtube_video_tool(query: str) -> Dict[str, Any]:
    """Searches for a YouTube video based on the query and returns its title and URL.
    Args:
        query (str): The search query for the YouTube video.
    """
    if not settings.PLUGIN_ENTERTAINMENT_ENABLED:
        return {"error": "Entertainment plugin is not enabled."}
    
    # Placeholder for actual YouTube API call
    return {"title": f"Mock YouTube video for {query}", "url": f"https://www.youtube.com/watch?v=mock_video_id_{query}"}

def get_entertainment_tools():
    return [play_music_tool, get_movie_info_tool, get_youtube_video_tool]
