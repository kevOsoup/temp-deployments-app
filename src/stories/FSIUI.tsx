import React from 'react';

export interface FSIUIProps {
  title?: string;
}

export const FSIUI: React.FC<FSIUIProps> = ({
  title = 'Flex Security Intelligence'
}) => {
  return (
    <div className="tw-bg-flex-security-black tw-mx-auto tw-p-4 tw-text-white tw-font-primary">
      <h1 className="tw-text-2xl tw-font-bold tw-mb-4">{title}</h1>
      <div className="tw-p-4 tw-bg-flex-security-black-accent tw-rounded">
        {/* FSI UI content will go here */}
        <p>FSI UI Component</p>
      </div>
    </div>
  );
};
