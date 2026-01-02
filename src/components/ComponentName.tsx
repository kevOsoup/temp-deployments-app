// TODO: Replace "ComponentName" with your actual component name
export interface ComponentNameProps {
  label: string;
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  // TODO: Add your component-specific props here
}

// TODO: Replace "ComponentName" with your actual component name
export const ComponentName = ({ label, ...props }: ComponentNameProps) => {
  // TODO: Customize your component's styling classes
  const base = "tw-font-bold tw-rounded-5px tw-border-1px tw-border-solid tw-outline-none";


  // TODO: Customize your component's JSX structure
  return (
    <button className={`${base} tw-bg-secondary-600 tw-text-white hover:tw-bg-secondary tw-border-black`} {...props}>
      {label}
    </button>

  );
};
