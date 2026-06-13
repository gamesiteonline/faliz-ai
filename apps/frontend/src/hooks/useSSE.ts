import { useEffect, useRef } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addMessageToHistory, addProactiveSuggestion } from '@/store/slices/faliz.slice';

export const useSSE = (url: string) => {
  const dispatch = useAppDispatch();
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!url) return;

    eventSourceRef.current = new EventSource(url);

    eventSourceRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Handle different types of SSE events
      if (data.type === 'chat_token') {
        // This is for streaming chat responses, might need a different mechanism
        // or a dedicated state for current streaming response
        console.log('Received chat token:', data.payload);
      } else if (data.type === 'proactive_suggestion') {
        dispatch(addProactiveSuggestion(data.payload.suggestion));
      } else if (data.type === 'notification') {
        // Handle notifications, e.g., show a toast or add to a notification feed
        console.log('Received notification:', data.payload);
      } else if (data.type === 'tool_output') {
        dispatch(addMessageToHistory({ role: 'tool', content: JSON.stringify(data.payload, null, 2) }));
      }
      // Add more event types as needed
    };

    eventSourceRef.current.onerror = (error) => {
      console.error('SSE Error:', error);
      eventSourceRef.current?.close();
    };

    return () => {
      eventSourceRef.current?.close();
    };
  }, [url, dispatch]);

  // This hook primarily sets up the SSE connection and dispatches actions.
  // No direct return value needed for external components to consume.
};
