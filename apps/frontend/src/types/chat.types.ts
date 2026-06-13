export interface ConversationMessage {
  role: 'user' | 'faliz' | 'tool';
  content: string;
  timestamp: string;
}
