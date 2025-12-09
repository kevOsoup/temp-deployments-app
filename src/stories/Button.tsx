// TODO: Replace "ComponentName" with your actual component name
export interface ButtonProps {
  label: string;
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  minWidth?: boolean;
  disabled?: boolean;
  // TODO: Add your component-specific props here
}

export const Button = ({ label, minWidth, disabled, ...props }: ButtonProps) => {
  const base = `
    tw-group tw-relative tw-m-2 tw-px-8 tw-py-3.5 tw-font-primary tw-font-semibold tw-text-sm tw-tracking-wider tw-uppercase
    tw-flex tw-select-none tw-justify-center tw-items-center tw-outline-none tw-overflow-hidden
    tw-rounded-lg tw-border-2 tw-transition-all tw-duration-300 tw-ease-out
    ${minWidth ? 'tw-min-w-[200px]' : 'tw-min-w-[140px]'}
    ${
      disabled
        ? 'tw-border-gray-600 tw-bg-gray-700 tw-text-gray-400 tw-cursor-not-allowed tw-opacity-60'
        : 'tw-border-blue-500 tw-bg-gradient-to-r tw-from-blue-600 tw-to-blue-500 tw-text-white tw-shadow-lg tw-shadow-blue-500/30 hover:tw-shadow-xl hover:tw-shadow-blue-500/40 hover:tw-scale-105 hover:tw-border-blue-400 active:tw-scale-95'
    }
  `.trim().replace(/\s+/g, ' ');

  return (
    <button className={base} disabled={disabled} {...props}>
      {!disabled && (
        <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-transparent tw-via-white/20 tw-to-transparent tw-translate-x-[-100%] group-hover:tw-translate-x-[100%] tw-transition-transform tw-duration-700 tw-ease-out"></div>
      )}
      <span className="tw-relative tw-pointer-events-none tw-flex tw-justify-center tw-items-center tw-w-full tw-drop-shadow-sm">
        {label}
      </span>
    </button>
  );
};
