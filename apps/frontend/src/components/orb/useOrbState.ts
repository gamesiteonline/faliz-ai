import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setOrbState, OrbState } from '@/store/slices/faliz.slice';

export const useOrbState = () => {
  const dispatch = useAppDispatch();
  const { isListening, isSpeaking, isThinking } = useAppSelector((state) => state.faliz);

  useEffect(() => {
    let newState: OrbState = 'IDLE';
    if (isListening) {
      newState = 'LISTENING';
    } else if (isThinking) {
      newState = 'THINKING';
    } else if (isSpeaking) {
      newState = 'SPEAKING';
    }
    dispatch(setOrbState(newState));
  }, [isListening, isSpeaking, isThinking, dispatch]);

  // This hook primarily manages the orb state based on other slices.
  // No direct return value needed for external components to consume.
};
