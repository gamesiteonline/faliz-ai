from typing import List
from langchain_core.tools import BaseTool

from ..config import settings

# Import tools from various plugins
from ..plugins.voice.tools import get_voice_tools
from ..plugins.calendar.tools import get_calendar_tools
from ..plugins.tasks.tools import get_tasks_tools
from ..plugins.email.tools import get_email_tools
from ..plugins.system.tools import get_system_tools
from ..plugins.weather.tools import get_weather_tools
from ..plugins.smarthome.tools import get_smarthome_tools
from ..plugins.vision.tools import get_vision_tools
from ..plugins.knowledge.tools import get_knowledge_tools
from ..plugins.entertainment.tools import get_entertainment_tools
from ..plugins.location.tools import get_location_tools
from ..plugins.career.tools import get_career_tools
from ..plugins.security.tools import get_security_tools
# from ..plugins.analytics.tools import get_analytics_tools # Analytics tools are not yet generated

def get_all_faliz_tools() -> List[BaseTool]:
    all_tools: List[BaseTool] = []

    if settings.PLUGIN_VOICE_ENABLED:
        all_tools.extend(get_voice_tools())
    if settings.PLUGIN_CALENDAR_ENABLED:
        all_tools.extend(get_calendar_tools())
    if settings.PLUGIN_TASKS_ENABLED:
        all_tools.extend(get_tasks_tools())
    if settings.PLUGIN_EMAIL_ENABLED:
        all_tools.extend(get_email_tools())
    if settings.PLUGIN_SYSTEM_ENABLED:
        all_tools.extend(get_system_tools())
    if settings.OPENWEATHER_API_KEY: # Weather plugin depends on API key
        all_tools.extend(get_weather_tools())
    if settings.PLUGIN_SMARTHOME_ENABLED:
        all_tools.extend(get_smarthome_tools())
    if settings.PLUGIN_VISION_ENABLED:
        all_tools.extend(get_vision_tools())
    # Knowledge tools have internal API key checks
    all_tools.extend(get_knowledge_tools())
    if settings.PLUGIN_ENTERTAINMENT_ENABLED:
        all_tools.extend(get_entertainment_tools())
    if settings.GOOGLE_MAPS_API_KEY: # Location plugin depends on API key
        all_tools.extend(get_location_tools())
    # Career tools have internal API key checks
    all_tools.extend(get_career_tools())
    if settings.FACE_AUTH_ENABLED: # Security plugin depends on face auth setting
        all_tools.extend(get_security_tools())
    # if settings.PLUGIN_ANALYTICS_ENABLED:
    #     all_tools.extend(get_analytics_tools())

    return all_tools
