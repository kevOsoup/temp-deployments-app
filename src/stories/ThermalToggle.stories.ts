import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

// TODO: Replace "ThermalToggle" with your actual component name
import { ThermalToggle } from './ThermalToggle';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  // TODO: Update the title with your component name
  title: 'Example/ThermalToggle',
  // TODO: Replace ThermalToggle with your actual component
  component: ThermalToggle,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    onChange: { action: 'changed' }
  },
  // Use `fn` to spy on the onChange arg, which will appear in the actions panel once invoked
  args: { onChange: fn() },
} satisfies Meta<typeof ThermalToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    label: 'Thermal Mode',
    initialState: false,
  },
};

export const Active: Story = {
  args: {
    label: 'Thermal Mode',
    initialState: true,
  },
};

export const CustomColors: Story = {
  args: {
    label: 'Custom Colors',
    initialState: false,
    activeColor: '#10B981', // Green-500 equivalent
    inactiveColor: '#FECACA', // Red-200 equivalent
  },
};

export const WithCustomId: Story = {
  args: {
    label: 'With Custom ID',
    initialState: false,
    id: 'my-custom-thermal-toggle'
  },
};

export const CustomColorsActive: Story = {
  args: {
    label: 'Custom Colors (Active)',
    initialState: true,
    activeColor: '#10B981', // Green-500 equivalent
    inactiveColor: '#FECACA', // Red-200 equivalent
  },
};
