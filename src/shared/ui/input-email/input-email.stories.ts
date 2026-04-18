import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { InputEmail } from './InputEmail';

const meta = {
  title: 'Shared/InputEmail',
  component: InputEmail,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputEmail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
