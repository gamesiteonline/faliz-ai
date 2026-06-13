import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isSidebarOpen: boolean;
  isRightPanelOpen: boolean;
  activeView: string;
  isOnline: boolean;
  showUpdateNotification: boolean;
  updateProgress: number;
}

const initialState: UiState = {
  isSidebarOpen: true,
  isRightPanelOpen: true,
  activeView: 'home',
  isOnline: navigator.onLine,
  showUpdateNotification: false,
  updateProgress: 0,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleRightPanel: (state) => {
      state.isRightPanelOpen = !state.isRightPanelOpen;
    },
    setActiveView: (state, action: PayloadAction<string>) => {
      state.activeView = action.payload;
    },
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    setShowUpdateNotification: (state, action: PayloadAction<boolean>) => {
      state.showUpdateNotification = action.payload;
    },
    setUpdateProgress: (state, action: PayloadAction<number>) => {
      state.updateProgress = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  toggleRightPanel,
  setActiveView,
  setOnlineStatus,
  setShowUpdateNotification,
  setUpdateProgress,
} = uiSlice.actions;

export default uiSlice.reducer;
