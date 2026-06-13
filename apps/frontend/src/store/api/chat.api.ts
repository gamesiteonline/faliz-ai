import { baseApi } from './base.api';
import { ConversationMessage } from '../../types/chat.types';

interface ChatResponse {
  response: string;
  history: ConversationMessage[];
}

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<ChatResponse, { message: string }> ({
      query: ({ message }) => ({
        url: '/chat/send',
        method: 'POST',
        body: { message },
      }),
    }),
    getChatHistory: builder.query<ConversationMessage[], void>({
      query: () => '/chat/history',
      providesTags: ["Conversation"],
    }),
  }),
});

export const { useSendMessageMutation, useGetChatHistoryQuery } = chatApi;
