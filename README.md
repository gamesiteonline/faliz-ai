# F.A.L.I.Z AI System

![FALIZ AI Logo](https://via.placeholder.com/150x150?text=FALIZ+AI)

**F.A.L.I.Z AI** (Flexible Autonomous Life Intelligence Zone) is an advanced personal AI operating system designed to intelligently orchestrate your digital life. Built with a modular architecture, FALIZ AI aims to anticipate your needs, streamline your workflows, and provide proactive assistance across various domains, from productivity and communication to smart home integration and personal knowledge management.

## Features

FALIZ AI is equipped with a rich set of features, powered by a combination of cutting-edge AI models and robust integrations:

-   **Intelligent Conversational Interface**: Interact with FALIZ AI using natural language, both text and voice, for seamless command and control.
-   **Proactive Assistance**: FALIZ AI learns your patterns and preferences to offer timely suggestions and automate routine tasks.
-   **Modular Plugin System**: Extend FALIZ AI's capabilities with a wide array of plugins for various functionalities:
    -   **Voice Engine**: Provides always-on wake word detection, VAD-triggered audio capture, Whisper API transcription, context-aware NLU, streaming TTS, multi-user voice profiles, emotional tone detection, and noise cancellation.
    -   **AI Brain**: Utilizes LangGraph for stateful agent orchestration with planning and execution loops, conversation memory, long-term memory via vector embeddings, intelligent tool selection, multi-step task planning, reflection layer, and a proactive suggestion engine.
    -   **Calendar & Time**: Integrates with Google Calendar for CRUD operations, offers natural language scheduling, timezone intelligence, morning briefing generation, meeting preparation, focus block automation, and smart scheduling.
    -   **Tasks & Productivity**: Features a full CRUD task system with subtasks, tags, priority levels, Eisenhower matrix auto-categorization, recurring tasks engine, time tracking, completion streaks, daily/weekly review automation, Pomodoro mode, and deep work session locking.
    -   **Communications**: Integrates with Gmail (OAuth2, smart inbox, triage mode, auto-draft replies, follow-up tracker, bulk unsubscribe, analytics), SMS via Twilio (send/receive, voice-to-SMS, scheduled SMS), and aggregates cross-platform notifications.
    -   **Weather & News**: Leverages OpenWeatherMap for current weather, forecasts, and alerts, providing outfit/activity suggestions. Integrates with NewsAPI for headlines, RSS feed aggregation, article summarization, daily digests, trend detection, Wikipedia entity lookup, and Wolfram Alpha computational queries.
    -   **System Control**: Enables application launching, provides system metrics (CPU, RAM, GPU, disk, network, battery), process management, screenshot with OCR and description, file operations (find, move, archive, delete), temporary file cleanup, clipboard management, auto-backup, and window management.
    -   **Smart Home**: Offers Home Assistant integration for entity control, scene execution, automation creation, energy monitoring, device status queries, guest mode, and away mode.
    -   **Computer Vision**: Analyzes webcam feeds with GPT-4o Vision, performs facial recognition, visitor logging, motion detection alerts, document scanning (OCR), QR/barcode reading, object detection, and screen understanding.
    -   **Content Creation**: Supports DALL-E 3 image generation, PowerPoint auto-building, chart/graph generation, social media post drafting, video script writing, blog post outlining/drafting, logo concept generation, and presentation coaching.
    -   **Knowledge & Documents**: Provides PDF/Word/Excel reading/summarization, document Q&A, personal knowledge base management, note-taking (voice-to-text, auto-tagging), meeting recording, research assistance, flashcard generation, and bookmark management.
    -   **Career & Professional**: Includes a resume analyzer, job alert system, interview coach, salary benchmarker, skill gap analyzer, LinkedIn post drafter, and contract reviewer.
    -   **Entertainment**: Integrates with Spotify for playback control (play, pause, skip, volume, queue, playlist CRUD), voice music control, YouTube search/play, a joke/trivia engine, interactive fiction, movie/show recommendations, sports scores, and podcast discovery.
    -   **Navigation & Location**: Utilizes Google Maps integration for directions, ETA, traffic, commute tracking, and nearby place searches.
-   **Long-Term Memory**: Employs vector databases (ChromaDB) to store and retrieve contextual information, ensuring personalized and consistent interactions across sessions.
-   **Cross-Platform Desktop Application**: A native Electron application provides deep system integration and a rich user experience, offering features like system tray integration, auto-updates, and native notifications.
-   **Web-based Frontend**: Access FALIZ AI from any web browser with a responsive and intuitive interface built with React, TypeScript, and TailwindCSS.
-   **Robust Backend**: Powered by FastAPI, offering a high-performance and scalable API for all services, integrating with various AI models (OpenAI, ElevenLabs) and managing data (PostgreSQL, Redis).

## Architecture Overview

FALIZ AI is built as an event-driven microservices monorepo with a modular plugin system. Communication between services is handled via REST, WebSockets, Server-Sent Events, and IPC (Electron). State management is handled by Redux Toolkit (frontend) and Redis pub/sub (backend event bus). The AI core utilizes LangChain for agent orchestration over OpenAI GPT-4o, featuring function calling, structured output via Zod schemas, streaming responses, conversation memory (LangChain ConversationBufferWindowMemory), long-term memory (ChromaDB vector store), and agent-based planning for multi-step tasks.

## Technical Stack

### Frontend
-   **Framework:** React 18.3 + TypeScript 5.4 (strict mode)
-   **Build Tool:** Vite 5.x
-   **Styling:** TailwindCSS 3.4 + shadcn/ui components
-   **Animations:** Framer Motion 11
-   **State Management:** Redux Toolkit 2.x + RTK Query
-   **Forms:** React Hook Form + Zod
-   **Data Visualization:** Recharts
-   **Real-time:** Socket.io-client
-   **Routing:** React Router v6

### Desktop Shell
-   **Framework:** Electron 31.x (cross-platform)
-   **Packaging:** electron-builder
-   **IPC:** contextBridge + preload scripts
-   **Features:** System tray integration, auto-updater (electron-updater), native notifications

### Backend
-   **Language:** Python 3.12
-   **Web Framework:** FastAPI 0.111 + Uvicorn (async ASGI)
-   **AI Orchestration:** LangChain 0.2.x + LangGraph
-   **ORM:** SQLAlchemy 2.0 (async ORM) + Alembic (migrations)
-   **Data Validation:** Pydantic v2
-   **Background Tasks:** Celery + Redis
-   **Scheduled Jobs:** APScheduler
-   **Real-time:** WebSockets via FastAPI native
-   **HTTP Client:** httpx (async)

### Databases
-   **Primary:** PostgreSQL 16 (users, tasks, memory, logs)
-   **Cache/Pub/Sub:** Redis 7.2
-   **Vector Embeddings:** ChromaDB
-   **Local Cache:** SQLite (for Electron offline mode)

### Voice Pipeline
-   **STT:** OpenAI Whisper API (cloud) + whisper.cpp (offline fallback)
-   **TTS:** ElevenLabs API (primary) + Coqui TTS (offline fallback)
-   **Wake Word:** Picovoice Porcupine (offline, always-on)
-   **VAD:** Silero VAD (voice activity detection)
-   **Audio Capture:** PyAudio + sounddevice

### AI/LLM
-   **Primary LLM:** OpenAI GPT-4o (reasoning + function calling)
-   **Vision:** GPT-4o vision endpoint
-   **Embeddings:** text-embedding-3-large
-   **Image Generation:** DALL-E 3
-   **Fallback LLM:** Claude 3.5 Sonnet
-   **Local Fallback LLM:** Ollama (llama3.2 for offline mode)

### Security
-   **Authentication:** OAuth2 (Google + GitHub) + JWT (access) + Refresh tokens
-   **Encryption:** cryptography (AES-256-GCM)
-   **Secrets Management:** python-dotenv + HashiCorp Vault pattern
-   **Face Authentication:** DeepFace
-   **Rate Limiting:** slowapi + Redis sliding window

### Deployment
-   **Local Development:** Docker Compose
-   **CI/CD:** GitHub Actions
-   **Reverse Proxy:** Nginx
-   **Monitoring:** Health check endpoints

## Getting Started

To get your F.A.L.I.Z AI system up and running, please refer to the comprehensive [ACTIVATION_GUIDE.md](./ACTIVATION_GUIDE.md) for detailed step-by-step instructions on prerequisites, environment setup, and component activation.

## Development

### Project Structure

```
faliz-ai/
├── .env.example
├── docker-compose.yml
├── README.md
├── ACTIVATION_GUIDE.md
├── apps/
│   ├── backend/
│   │   ├── ai/             # AI core logic, brain, memory, prompts, tools registry
│   │   ├── core/           # Core utilities, database, redis, middleware, security
│   │   ├── models/         # SQLAlchemy models for database entities
│   │   ├── plugins/        # Modular plugins for various functionalities
│   │   ├── routers/        # FastAPI API endpoints
│   │   ├── schemas/        # Pydantic schemas for data validation
│   │   ├── main.py         # FastAPI application entry point
│   │   ├── config.py       # Application configuration
│   │   └── Dockerfile      # Dockerfile for backend service
│   ├── desktop/            # Electron desktop application
│   │   ├── src/            # Electron main and preload scripts
│   │   ├── package.json    # Node.js dependencies and scripts
│   │   └── ...
│   └── frontend/           # React web application
│       ├── public/         # Static assets
│       ├── src/            # React components, hooks, store, services, views
│       ├── package.json    # Node.js dependencies and scripts
│       └── ...
└── ...
```

### Running Tests

(Instructions for running tests will be added here in future updates.)

## Contributing

We welcome contributions to the F.A.L.I.Z AI project! Please refer to our `CONTRIBUTING.md` (to be created) for guidelines on how to submit issues, propose features, and contribute code.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## Contact

For any inquiries or support, please open an issue on the GitHub repository.
