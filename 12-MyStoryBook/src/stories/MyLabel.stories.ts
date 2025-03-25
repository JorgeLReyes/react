import { Meta, StoryObj } from "@storybook/react";
import { MyLabel } from "../components/MyLabel";

const meta = {
  title: "MyLabel",
  component: MyLabel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: { control: "inline-radio", options: ["h1", "h2", "h3", "normal"] },
    color: { control: "select" },
  },
} satisfies Meta<typeof MyLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: "Basic",
    size: "h1",
  },
};

export const AllCaps: Story = {
  args: {
    label: "AllCaps",
    size: "h1",
    allCaps: true,
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary",
    size: "h2",
    color: "text-secondary",
  },
};

export const CustomColor: Story = {
  args: {
    label: "CustomColor",
    size: "h1",
    fontColor: "#147346",
  },
};
