import React from 'react';
import { Button } from './Button';
import { Step } from './Step';

export interface FlexTechServiceProps {
  title?: string;
}

export const FlexTechService: React.FC<FlexTechServiceProps> = () => {
  return (
    <div className="tw-bg-flex-security-black tw-w-full tw-h-screen tw-flex tw-items-center tw-justify-center tw-flex-col tw-gap-20px">
      <div className='tw-flex tw-items-center tw-justify-center'>
        <Step text="Was the tech service satisfactory?" />
      </div>
      <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-items-center">
        <Button label='Yes' minWidth></Button>
        <Button label='No' minWidth></Button>
      </div>
    </div>
  );
};
