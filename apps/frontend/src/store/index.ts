import { configureStore } from '@reduxjs/toolkit';
import falizReducer from './slices/faliz.slice';
import authReducer from './slices/auth.slice';
import tasksReducer from './slices/tasks.slice';
import voiceReducer from './slices/voice.slice';
import uiReducer from './slices/ui.slice';
import systemReducer from './slices/system.slice';
import { baseApi } from './api/base.api';

export const store = configureStore({
  reducer: {
    faliz: falizReducer,
    auth: authReducer,
    tasks: tasksReducer,
    voice: voiceReducer,
    ui: uiReducer,
    system: systemReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
