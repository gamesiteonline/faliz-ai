import React from 'react';
import FalizOrb from '@/components/orb/FalizOrb';
import ChatView from '@/components/conversation/ChatView';
import { useAppSelector } from '@/store/hooks';
import { useOrbState } from '@/components/orb/useOrbState';

const HomeView: React.FC = () => {
  useOrbState(); // Activate orb state management
  const orbState = useAppSelector((state) => state.faliz.orbState);

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="flex-1 flex flex-col items-center justify-center">
        <FalizOrb size={250} />
        <h2 className="text-3xl font-syne font-bold text-falizText mt-8 mb-4">
          FALIZ AI is {orbState === 'IDLE' ? 'waiting' : orbState.toLowerCase()}...
        </h2>
        <p className="text-falizMutedText text-lg">Say "Hey Faliz" or type your command below.</p>
      </div>
      <div className="w-full max-w-3xl">
        <ChatView />
      </div>
    </div>
  );
};

export default HomeView;
