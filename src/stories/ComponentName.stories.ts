import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

// TODO: Replace "ComponentName" with your actual component name
import { ComponentName } from './ComponentName';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  // TODO: Update the title with your component name
  title: 'Example/ComponentName',
  // TODO: Replace ComponentName with your actual component
  component: ComponentName,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // TODO: Define any specific arg types here if needed
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    // TODO: Update the label with your component name
    label: 'ComponentName',
  },
};

export const Secondary: Story = {
  args: {
    // TODO: Update the label with your component name
    label: 'ComponentName',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    // TODO: Update the label with your component name
    label: 'ComponentName',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    // TODO: Update the label with your component name
    label: 'ComponentName',
  },
};

// TODO: Add additional stories for your component's different states
