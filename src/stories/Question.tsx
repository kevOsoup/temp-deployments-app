import React from 'react';

export interface QuestionProps {
  text: string;
}

export const Question: React.FC<QuestionProps> = ({ text }) => {
  return (
    <h1
      className="tw-leading-[1.2] tw-font-medium tw-font-primary tw-m-0"
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
