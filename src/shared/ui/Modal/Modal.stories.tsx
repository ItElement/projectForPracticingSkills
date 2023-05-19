import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Modal } from './Modal';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const ModalPrimary = Template.bind({});
ModalPrimary.args = {
    isOpen: true,
    children:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus cupiditate distinctio dolores eaque nisi nulla optio quas quasi soluta unde!',
};
ModalPrimary.decorators = [ThemeDecorator(Theme.LIGHT)];

export const ModalDark = Template.bind({});
ModalDark.args = {
    isOpen: true,
    children:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus cupiditate distinctio dolores eaque nisi nulla optio quas quasi soluta unde!',
};
ModalDark.decorators = [ThemeDecorator(Theme.DARK)];
