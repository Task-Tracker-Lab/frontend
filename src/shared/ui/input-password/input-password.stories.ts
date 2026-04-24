import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { InputPassword } from './InputPassword';

const meta = {
  title: 'Shared/InputPassword',
  component: InputPassword,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showEyeIcon: true,
    value: 'secret_password',
  },
};

export const Placeholder: Story = {
  args: {
    showEyeIcon: true,
  },
};

export const WithoutEyeIcon: Story = {
  args: {
    showEyeIcon: false,
  },
};
