import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Logo } from './Logo';

const meta = {
  title: 'Shared/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'default',
    variant: 'default',
  },
};

export const Sm: Story = {
  args: {
    size: 'sm',
    variant: 'default',
  },
};

export const Icon: Story = {
  args: {
    size: 'default',
    variant: 'icon',
  },
};

export const IconSm: Story = {
  args: {
    size: 'sm',
    variant: 'icon',
  },
};
