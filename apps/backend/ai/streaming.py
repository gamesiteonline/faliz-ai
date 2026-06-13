import asyncio
from typing import AsyncGenerator
from fastapi.responses import StreamingResponse

async def generate_sse_events(generator: AsyncGenerator):
    try:
        async for data in generator:
            yield f"data: {data}\n\n"
    except asyncio.CancelledError:
        print("SSE stream cancelled by client.")
    except Exception as e:
        print(f"SSE stream error: {e}")
        yield f"event: error\ndata: {{"error": "{e}"}}\n\n"

def create_sse_response(generator: AsyncGenerator) -> StreamingResponse:
    return StreamingResponse(generate_sse_events(generator), media_type="text/event-stream")
