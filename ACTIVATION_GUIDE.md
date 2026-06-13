# F.A.L.I.Z AI System Activation Guide

This guide provides detailed instructions on how to set up and activate your F.A.L.I.Z AI system. Please follow these steps carefully to ensure a smooth installation and operation.

## 1. Prerequisites

Before you begin, ensure you have the following software installed on your system:

-   **Docker & Docker Compose**: Essential for running the backend services in isolated containers.
    -   [Install Docker Engine](https://docs.docker.com/engine/install/)
    -   [Install Docker Compose](https://docs.docker.com/compose/install/)
-   **Node.js & npm/yarn**: Required for the frontend and desktop applications.
    -   [Install Node.js](https://nodejs.org/en/download/)
-   **Python 3.12+ & Poetry**: For managing backend dependencies.
    -   [Install Python](https://www.python.org/downloads/)
    -   [Install Poetry](https://python-poetry.org/docs/#installation)
-   **Git**: For cloning the repository.
    -   [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## 2. Environment Setup

### 2.1. Clone the Repository

First, clone the F.A.L.I.Z AI repository to your local machine:

```bash
git clone https://github.com/gamesiteonline/faliz-ai.git
cd faliz-ai
```

### 2.2. Configure Environment Variables

The F.A.L.I.Z AI system relies on several environment variables for configuration, especially for API keys and database connections. A template file `.env.example` is provided in the root directory. You need to create a `.env` file based on this template and fill in the required values.

```bash
cp .env.example .env
```

Open the newly created `.env` file in your text editor and update the following variables:

-   **`SECRET_KEY`**: A strong, random string for general application security.
-   **`JWT_SECRET`**: A strong, random string for JSON Web Token (JWT) signing.
-   **`DATABASE_URL`**: Your PostgreSQL database connection string (e.g., `postgresql+asyncpg://user:password@host:port/database_name`).
-   **`REDIS_URL`**: Your Redis connection string (e.g., `redis://localhost:6379/0`).
-   **`OPENAI_API_KEY`**: Your API key for OpenAI services (GPT models, embeddings).
-   **`ELEVENLABS_API_KEY`**: (Optional) Your API key for ElevenLabs for advanced text-to-speech.
-   **`PICOVOICE_ACCESS_KEY`**: (Optional) Your PicoVoice access key for local wake word detection.
-   **`GOOGLE_CLIENT_ID`**, **`GOOGLE_CLIENT_SECRET`**, **`GOOGLE_REDIRECT_URI`**: (Optional) Credentials for Google API integrations (Calendar, Gmail).
-   **`OPENWEATHER_API_KEY`**: (Optional) Your API key for OpenWeatherMap for weather information.
-   **`NEWS_API_KEY`**: (Optional) Your API key for NewsAPI for news headlines.
-   **`WOLFRAM_ALPHA_APP_ID`**: (Optional) Your App ID for Wolfram Alpha for computational knowledge.
-   **`HOME_ASSISTANT_URL`**, **`HOME_ASSISTANT_TOKEN`**: (Optional) Details for Home Assistant integration.

**Example `.env` configuration (partial):**

```ini
APP_ENV="development"
SECRET_KEY="your_super_secret_key_here_12345"
JWT_SECRET="another_very_secret_jwt_key_67890"
DATABASE_URL="postgresql+asyncpg://faliz_user:faliz_password@localhost:5432/faliz_db"
REDIS_URL="redis://localhost:6379/0"
OPENAI_API_KEY="sk-your_openai_api_key"
# ... other optional keys
```

## 3. Database Initialization

The F.A.L.I.Z AI backend uses PostgreSQL for data storage. You can use Docker Compose to easily set up a PostgreSQL and Redis instance.

```bash
docker compose up -d postgres redis chromadb
```

Once the containers are running, you need to initialize the database schema. The backend will attempt to run migrations on startup. Ensure your `DATABASE_URL` in `.env` points to the correct PostgreSQL instance.

## 4. Backend Setup (FastAPI)

Navigate to the backend directory and install Python dependencies using Poetry:

```bash
cd apps/backend
poetry install
```

Then, you can start the FastAPI backend server:

```bash
poetry run uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The backend API will be accessible at `http://localhost:8000`.

## 5. Frontend Setup (React)

Open a new terminal, navigate to the frontend directory, and install Node.js dependencies:

```bash
cd apps/frontend
yarn install # or npm install
```

Then, start the React development server:

```bash
yarn dev # or npm run dev
```

The frontend application will typically be available at `http://localhost:5173` (or another port if 5173 is in use).

## 6. Desktop Application Setup (Electron)

Open a new terminal, navigate to the desktop application directory, and install Node.js dependencies:

```bash
cd apps/desktop
yarn install # or npm install
```

To start the Electron application in development mode:

```bash
yarn electron:dev # or npm run electron:dev
```

This will launch the F.A.L.I.Z AI desktop application, which provides system-level integrations and a native user experience.

## 7. Initial Usage

1.  **Register an Account**: On the frontend application, navigate to the registration page and create your user account. This will create your user entry in the PostgreSQL database.
2.  **Login**: Log in with your newly created credentials.
3.  **Interact with FALIZ**: Once logged in, you can start interacting with FALIZ AI through the chat interface or by using the wake word "Hey Faliz" if the voice plugin is enabled and configured correctly.

## Troubleshooting

-   **`Connection refused` for database/Redis**: Ensure your Docker containers for PostgreSQL and Redis are running (`docker ps`) and your `DATABASE_URL` and `REDIS_URL` in `.env` are correct.
-   **Missing API keys**: Check your `.env` file. Many features (e.g., voice, weather, news) require specific API keys to be configured.
-   **Frontend/Backend communication issues**: Verify that the `CORS_ORIGINS` in your backend `.env` includes the frontend's URL (e.g., `http://localhost:5173`).
-   **Electron app not launching**: Check the console output in the terminal where you ran `yarn electron:dev` for any errors.

For further assistance, please refer to the project's `README.md` or open an issue on the GitHub repository.
