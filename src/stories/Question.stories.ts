import type { Meta, StoryObj } from '@storybook/react';
import { Question } from './Question';

const meta = {
  title: 'Components/Question',
  component: Question,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Question>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Components',
  },
};
