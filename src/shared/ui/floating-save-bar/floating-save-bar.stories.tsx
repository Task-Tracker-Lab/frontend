import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FloatingSaveBar } from './FloatingSaveBar';

const meta = {
  title: 'Shared/FloatingSaveBar',
  component: FloatingSaveBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="relative min-h-[240px] p-4">
      <FloatingSaveBar {...args} />
    </div>
  ),
} satisfies Meta<typeof FloatingSaveBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Visible: Story = {
  args: {
    visible: true,
    onSave: () => undefined,
    onDiscard: () => undefined,
  },
};

export const Hidden: Story = {
  args: {
    visible: false,
    onSave: () => undefined,
    onDiscard: () => undefined,
  },
};
