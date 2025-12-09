import type { Meta, StoryObj } from '@storybook/react-vite';

import { FastTrackDeploymentsApp } from './FastTrackDeploymentsApp';

const meta = {
    title: 'playground/Fast Track Deployments App',
    component: FastTrackDeploymentsApp,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof FastTrackDeploymentsApp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
