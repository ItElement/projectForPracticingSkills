import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Skeleton } from './Skeleton';

export default {
    title: 'shared/Skeleton',
    component: Skeleton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    width: '100%',
    height: 200,
};

export const Circle = Template.bind({});
Circle.args = {
    border: '50%',
    width: 100,
    height: 100,
};

export const NormalOrange = Template.bind({});
NormalOrange.args = {
    width: '100%',
    height: 200,
};
NormalOrange.decorators = [ThemeDecorator(Theme.ORANGE)];

export const CircleOrange = Template.bind({});
CircleOrange.args = {
    border: '50%',
    width: 100,
    height: 100,
};
CircleOrange.decorators = [ThemeDecorator(Theme.ORANGE)];
