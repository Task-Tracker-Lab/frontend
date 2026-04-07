import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Link } from './link';

const meta = {
  title: 'Shared/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    href: '#',
    children: 'Link',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    href: '#',
    children: 'Link',
  },
};

export const Clear: Story = {
  args: {
    variant: 'clear',
    href: '#',
    children: 'Link',
  },
};
