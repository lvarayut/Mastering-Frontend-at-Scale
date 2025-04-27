import type { Meta, StoryObj } from '@storybook/react';

import SearchIcon from './SearchIcon';

const meta = {
  component: SearchIcon,
} satisfies Meta<typeof SearchIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};