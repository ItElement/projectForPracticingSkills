import { addDecorator } from '@storybook/react';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { Theme } from '../../src/shared/const/theme';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    layout: 'fullscreen',
    // аддон для настройки смены цветов в сторибук на сайте
    themes: {
        default: 'dark',
        list: [
            { name: 'light', class: ['app', Theme.LIGHT], color: '#00aced' },
            { name: 'dark', class: ['app', Theme.DARK], color: '#000000' },
            { name: 'orange', class: ['app', Theme.ORANGE], color: '#ec8706' },
        ],
    },
};

addDecorator(StyleDecorator);
// addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouterDecorator);
addDecorator(SuspenseDecorator);
