from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    APP_ENV: str = "development"
    SECRET_KEY: str
    JWT_SECRET: str
    JWT_EXPIRE_MINUTES: int = 60
    JWT_REFRESH_EXPIRE_DAYS: int = 30
    CONVERSATION_MEMORY_K: int = 20

    DATABASE_URL: str
    REDIS_URL: str
    CHROMA_HOST: str = "localhost"
    CHROMA_PORT: int = 8000

    OPENAI_API_KEY: str
    OPENAI_MODEL: str = "gpt-4o"
    OPENAI_EMBEDDING_MODEL: str = "text-embedding-3-large"
    ANTHROPIC_API_KEY: str | None = None
    OLLAMA_BASE_URL: str = "http://localhost:11434"

    ELEVENLABS_API_KEY: str | None = None
    ELEVENLABS_VOICE_ID: str | None = None
    PICOVOICE_ACCESS_KEY: str | None = None
    WHISPER_MODEL: str = "whisper-1"

    GOOGLE_CLIENT_ID: str | None = None
    GOOGLE_CLIENT_SECRET: str | None = None
    GOOGLE_REDIRECT_URI: str | None = None
    GOOGLE_CALENDAR_SCOPES: str = "https://www.googleapis.com/auth/calendar"
    GMAIL_SCOPES: str = "https://mail.google.com/"
    GOOGLE_MAPS_API_KEY: str | None = None

    OPENWEATHER_API_KEY: str | None = None
    NEWS_API_KEY: str | None = None
    WOLFRAM_ALPHA_APP_ID: str | None = None
    TWILIO_ACCOUNT_SID: str | None = None
    TWILIO_AUTH_TOKEN: str | None = None
    TWILIO_PHONE_FROM: str | None = None
    SPOTIFY_CLIENT_ID: str | None = None
    SPOTIFY_CLIENT_SECRET: str | None = None

    HOME_ASSISTANT_URL: str = "http://homeassistant.local:8123"
    HOME_ASSISTANT_TOKEN: str | None = None

    ENCRYPTION_KEY: str | None = None
    FACE_AUTH_ENABLED: bool = True
    FACE_AUTH_CONFIDENCE: float = 0.8

    PLUGIN_VOICE_ENABLED: bool = True
    PLUGIN_CALENDAR_ENABLED: bool = True
    PLUGIN_TASKS_ENABLED: bool = True
    PLUGIN_EMAIL_ENABLED: bool = True
    PLUGIN_SYSTEM_ENABLED: bool = True
    PLUGIN_SMARTHOME_ENABLED: bool = False
    PLUGIN_VISION_ENABLED: bool = True
    PLUGIN_ENTERTAINMENT_ENABLED: bool = True
    PLUGIN_ANALYTICS_ENABLED: bool = True

    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:8000"
    APP_VERSION: str = "1.0.0-production"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()
