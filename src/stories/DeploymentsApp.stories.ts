import type { Meta, StoryObj } from '@storybook/react-vite';

import { DeploymentsApp } from './DeploymentsApp';

const meta = {
  title: 'playground/Deployments App',
  component: DeploymentsApp,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DeploymentsApp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
