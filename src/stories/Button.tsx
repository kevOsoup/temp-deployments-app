export interface ButtonProps {
  label: string;
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export const Button = ({ label, primary, size = 'medium', ...props }: ButtonProps) => {
  const base = "tw-font-bold tw-rounded-5px tw-border-1px tw-border-solid tw-outline-none";
  const mode = primary
    ? "tw-bg-secondary-600 tw-text-black tw-text-white hover:tw-bg-secondary tw-border-black"
    : "tw-bg-primary tw-text-black hover:tw-bg-primary-300";
  const sizes = {
    small: "tw-px-2 tw-py-1 tw-text-sm",
    medium: "tw-px-4 tw-py-2 tw-text-base",
    large: "tw-px-6 tw-py-3 tw-text-lg",
  };

  return (
    <button className={`${base} ${mode} ${sizes[size]}`} {...props}>
      {label}
    </button>
  );
};
