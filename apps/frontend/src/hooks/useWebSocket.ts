import { useEffect, useRef, useState, useCallback } from 'react';

interface WebSocketOptions {
  onOpen?: (event: Event) => void;
  onMessage?: (event: MessageEvent) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
  reconnectInterval?: number;
  reconnectLimit?: number;
}

export const useWebSocket = (url: string, options?: WebSocketOptions) => {
  const { onOpen, onMessage, onClose, onError, reconnectInterval = 3000, reconnectLimit = 5 } = options || {};
  const ws = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(() => {
    if (ws.current && (ws.current.readyState === WebSocket.OPEN || ws.current.readyState === WebSocket.CONNECTING)) {
      return; // Already connected or connecting
    }
    if (reconnectAttempts >= reconnectLimit) {
      console.warn(`WebSocket reconnect limit reached for ${url}`);
      return;
    }

    setIsConnected(false);
    ws.current = new WebSocket(url);

    ws.current.onopen = (event) => {
      console.log(`WebSocket connected to ${url}`);
      setIsConnected(true);
      setReconnectAttempts(0);
      onOpen?.(event);
    };

    ws.current.onmessage = (event) => {
      onMessage?.(event);
    };

    ws.current.onclose = (event) => {
      console.log(`WebSocket disconnected from ${url}`);
      setIsConnected(false);
      onClose?.(event);
      if (!event.wasClean) {
        // Attempt to reconnect if not a clean close
        reconnectTimeout.current = setTimeout(() => {
          setReconnectAttempts((prev) => prev + 1);
          connect();
        }, reconnectInterval);
      }
    };

    ws.current.onerror = (event) => {
      console.error(`WebSocket error on ${url}:`, event);
      onError?.(event);
      ws.current?.close(); // Close to trigger reconnect logic in onclose
    };
  }, [url, onOpen, onMessage, onClose, onError, reconnectInterval, reconnectLimit, reconnectAttempts]);

  useEffect(() => {
    connect();

    return () => {
      if (ws.current) {
        ws.current.close(1000, "Component unmounted");
      }
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, [connect]);

  const sendMessage = useCallback((message: string | object) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(typeof message === 'string' ? message : JSON.stringify(message));
    } else {
      console.warn("WebSocket is not open. Message not sent.");
    }
  }, []);

  return { ws: ws.current, isConnected, sendMessage };
};
