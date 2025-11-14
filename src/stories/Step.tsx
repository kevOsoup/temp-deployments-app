import React from 'react';

export interface StepProps {
  text: string;
}

export const Step: React.FC<StepProps> = ({ text }) => {
  return (
    <h1
      className="tw-leading-[1.2] tw-font-medium tw-font-primary tw-m-0 tw-text-center"
      style={{
        background: 'linear-gradient(90deg, #4283cc, #0162c3 39%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {text}
    </h1>
  );
};
