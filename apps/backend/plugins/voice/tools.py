from langchain_core.tools import tool
from ..config import settings

@tool
async def transcribe_audio_tool(audio_file_path: str) -> str:
    """Transcribes an audio file to text using the voice plugin. Input should be a file path to the audio.
    This tool is useful for converting spoken language into written text for further processing.
    """
    if not settings.PLUGIN_VOICE_ENABLED:
        return "Voice plugin is not enabled."
    
    # Placeholder for actual transcription logic
    # In a real application, this would call an external transcription service or a local model
    return f"Mock transcription of {audio_file_path}: 'The user said something important.'"

@tool
async def synthesize_speech_tool(text: str) -> str:
    """Synthesizes text into spoken audio using the voice plugin. Input should be the text to be spoken.
    This tool is useful for providing auditory feedback or responses to the user.
    """
    if not settings.PLUGIN_VOICE_ENABLED:
        return "Voice plugin is not enabled."
    
    # Placeholder for actual speech synthesis logic
    # In a real application, this would call an external TTS service or a local model
    return f"Mock audio URL for '{text}': https://example.com/audio/{hash(text)}.mp3"

def get_voice_tools():
    return [transcribe_audio_tool, synthesize_speech_tool]
