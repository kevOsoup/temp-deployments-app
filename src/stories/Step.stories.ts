import type { Meta, StoryObj } from '@storybook/react';
import { Step } from './Step';

const meta = {
  title: 'UI/Step',
  component: Step,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Step>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Components',
  },
};
