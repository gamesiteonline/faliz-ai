import { baseApi } from './base.api';

interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkActivity: {
    upload: number;
    download: number;
  };
}

export const systemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSystemMetrics: builder.query<SystemMetrics, void>({
      query: () => '/system/metrics',
      // Polling for real-time updates
      pollingInterval: 5000,
    }),
  }),
});

export const { useGetSystemMetricsQuery } = systemApi;
