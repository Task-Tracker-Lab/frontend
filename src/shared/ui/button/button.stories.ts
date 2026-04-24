import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

const meta = {
  title: 'Shared/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'default',
    variant: 'default',
    children: 'Button',
  },
};

export const Destructive: Story = {
  args: {
    size: 'default',
    variant: 'destructive',
    children: 'Button',
  },
};

export const Outline: Story = {
  args: {
    size: 'default',
    variant: 'outline',
    children: 'Button',
  },
};
