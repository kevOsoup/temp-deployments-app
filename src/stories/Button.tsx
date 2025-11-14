// TODO: Replace "ComponentName" with your actual component name
export interface ButtonProps {
  label: string;
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  minWidth?: boolean;
  // TODO: Add your component-specific props here
}

// TODO: Replace "ComponentName" with your actual component name
export const Button = ({ label, minWidth, ...props }: ButtonProps) => {
  // TODO: Customize your component's styling classes
  const base = `tw-m-10px tw-font-primary tw-flex tw-select-none tw-justify-center tw-items-center tw-outline-none tw-shadow-none tw-rounded-none tw-border-1px tw-transition-colors tw-duration-500 hover:tw-duration-200 tw-font-flex-normal tw-tracking-[.15em] tw-text-[1em] tw-border-[#0078FF] tw-bg-[#0078FF] tw-text-white hover:tw-bg-white hover:tw-text-[#0078FF] ${minWidth ? 'tw-min-w-[175px]' : ''}`;


  // TODO: Customize your component's JSX structure
  return (
    <button className={base} {...props}>
      <span className="tw-pointer-events-none tw-flex tw-justify-center tw-items-center tw-w-full || tw-px-5 tw-py-10d tw-min-h-30px tw-pt-1px tw-font-normal">
        {label}
      </span>
    </button>

  );
};
