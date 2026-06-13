import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setSystemMetrics } from '@/store/slices/system.slice';
import { useGetSystemMetricsQuery } from '@/store/api/system.api';

export const useSystemMetrics = () => {
  const dispatch = useAppDispatch();
  const { data: metrics, isLoading, isError } = useGetSystemMetricsQuery();

  useEffect(() => {
    if (metrics) {
      dispatch(setSystemMetrics(metrics));
    }
  }, [metrics, dispatch]);

  return { metrics, isLoading, isError };
};
