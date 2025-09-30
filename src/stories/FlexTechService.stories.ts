import type { Meta, StoryObj } from '@storybook/react-vite';

import { FlexTechService } from './FlexTechService';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Flex Security/Flex Tech Service',
  component: FlexTechService,
  parameters: {
    // This component needs more space than the default centered layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof FlexTechService>;

export default meta;
type Story = StoryObj<typeof meta>;

// Include the stories that Storybook is expecting
export const Primary: Story = {};
