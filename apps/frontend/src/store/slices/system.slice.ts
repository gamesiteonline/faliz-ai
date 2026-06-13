import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkActivity: {
    upload: number;
    download: number;
  };
}

interface SystemState {
  metrics: SystemMetrics;
  loading: boolean;
  error: string | null;
}

const initialState: SystemState = {
  metrics: {
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: 0,
    networkActivity: {
      upload: 0,
      download: 0,
    },
  },
  loading: false,
  error: null,
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setSystemMetrics: (state, action: PayloadAction<SystemMetrics>) => {
      state.metrics = action.payload;
    },
    setSystemLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSystemError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSystemMetrics, setSystemLoading, setSystemError } = systemSlice.actions;

export default systemSlice.reducer;
