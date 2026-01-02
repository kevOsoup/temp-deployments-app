import { useState, type ChangeEvent, type CSSProperties } from 'react';

export interface ThermalToggleProps {
  label: string;
  initialState?: boolean;
  onChange?: (isOn: boolean) => void;
  activeColor?: string; // Hex color value for active state (e.g. "#4F46E5")
  inactiveColor?: string; // Hex color value for inactive state (e.g. "#E5E7EB")
  id?: string; // Optional ID for the checkbox input
}

export const ThermalToggle = ({
  label,
  initialState = false,
  onChange,
  activeColor = '#0078ff', // Default to pink-600 equivalent
  inactiveColor = '#707070', // Default to gray-200 equivalent
  id,
}: ThermalToggleProps) => {
  const [isChecked, setIsChecked] = useState(initialState);
  // Use provided ID or generate a fallback
  const toggleId = id || `thermal-toggle-${Math.random().toString(36).substring(2, 11)}`;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newState = e.target.checked;
    setIsChecked(newState);
    onChange?.(newState);
  };

  return (
    <label htmlFor={toggleId} className="tw-flex tw-items-center tw-cursor-pointer tw-relative tw-mb-4">
      <input
        type="checkbox"
        id={toggleId}
        checked={isChecked}
        onChange={handleChange}
        className="tw-sr-only"
      />
      <div
        className={`
          tw-toggle-bg tw-border-2 tw-h-6 tw-w-11 tw-rounded-full
          tw-transition-colors tw-duration-200 tw-ease-in-out tw-relative
          before:tw-content-[''] before:tw-absolute before:tw-h-4 before:tw-w-4
          before:tw-left-1 before:tw-bottom-1 before:tw-bg-white before:tw-rounded-full
          before:tw-transition-transform before:tw-duration-200 before:tw-ease-in-out
          before:[transform:translateX(var(--translate-x))]
        `}
        style={{
          backgroundColor: isChecked ? activeColor : inactiveColor,
          borderColor: isChecked ? activeColor : inactiveColor,
          '--translate-x': isChecked ? '1.25rem' : '0rem',
        } as CSSProperties & { '--translate-x': string }}
      />
      <span className="tw-ml-3 tw-text-gray-900 tw-text-sm tw-font-medium">{label}</span>
    </label>
  );
};
