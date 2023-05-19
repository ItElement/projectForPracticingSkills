import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { NotificationList } from './NotificationList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'entities/NotificationList',
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => (
    <NotificationList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                {
                    id: '1',
                    title: 'Уведомление',
                    description: 'Всего хорошего',
                },
                {
                    id: '2',
                    title: 'Уведомление 2',
                    description: 'Всего хорошего',
                },
                {
                    id: '3',
                    title: 'Уведомление 3',
                    description: 'Всего хорошего',
                },
            ],
        },
    ],
};

export const isLoading = Template.bind({});
isLoading.args = {};
isLoading.decorators = [StoreDecorator({})];
isLoading.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                {
                    id: '1',
                    title: 'Уведомление',
                    description: 'Всего хорошего',
                },
                {
                    id: '2',
                    title: 'Уведомление 2',
                    description: 'Всего хорошего',
                },
                {
                    id: '3',
                    title: 'Уведомление 3',
                    description: 'Всего хорошего',
                },
            ],
            delay: 20000,
        },
    ],
};
