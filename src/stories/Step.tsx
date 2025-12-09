import React from 'react';

export interface StepProps {
  text: string;
}

export const Step: React.FC<StepProps> = ({ text }) => {
  return (
    <h1
      className="tw-leading-[1.3] tw-font-bold tw-font-primary tw-m-0 tw-text-center tw-text-3xl md:tw-text-4xl tw-px-4 tw-py-2 tw-drop-shadow-lg"
      style={{
        background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {text}
    </h1>
  );
};
