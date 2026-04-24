import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AppCopyright } from './AppCopyright';

const meta = {
  title: 'Shared/AppCopyright',
  component: AppCopyright,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppCopyright>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
