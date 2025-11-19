import type { Meta, StoryObj } from '@storybook/react-vite';

import { Wizard } from './Wizard';

const meta = {
  title: 'Components/Wizard',
  component: Wizard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Wizard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DeploymentWizard: Story = {
  args: {
    slides: [
      {
        text: 'What unit are you deploying?',
        description:'this is a test description',
        answers: [
          { label: 'Alpha', nextSlide: 1 },
          { label: 'Bravo', nextSlide: 1 },
        ],
        media: [
          { image: 'https://placehold.co/600x400/EEE/31343C' },
          { image: 'https://placehold.co/600x400/EEE/31343C' },
          { youtube: 'https://youtu.be/s8mebfGn3I0?si=3UvmJAYgxmMqgpX3&t=7'},
          { youtube: 'https://youtu.be/s8mebfGn3I0?si=3UvmJAYgxmMqgpX3&t=7'},
        ],
      },
      {
        text: 'Has the unit been physically deployed and turned on?',
        answers: [
          { label: "No", nextSlide: 2 },
          { label: "Yes, I've done this before and I'm very confident", nextSlide: 2 },
        ],
      },
    ],
  },
};
