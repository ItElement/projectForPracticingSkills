import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { InputCommon } from './InputCommon';

export default {
    title: 'shared/InputCommon',
    component: InputCommon,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof InputCommon>;

const Template: ComponentStory<typeof InputCommon> = (args) => <InputCommon {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    value: '123',
};
