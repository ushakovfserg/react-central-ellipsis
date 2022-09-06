import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withPerformance } from "storybook-addon-performance";

import { CentralEllipsis } from "./CentralEllipsis";

export default {
  title: "CentralEllipsis",
  component: CentralEllipsis,
  parameters: {},
  decorators: [withPerformance],
  argTypes: {
    children: {
      type: "string",
    },
  },
} as ComponentMeta<typeof CentralEllipsis>;

const Template: ComponentStory<typeof CentralEllipsis> = (args) => <CentralEllipsis {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  children: "12345671234567123456712345671234567123456712345671234567123456712345671234567",
  tailLength: 2,
};
