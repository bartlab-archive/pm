import {AppModule} from '../../app/interfaces/module';

export const meta: AppModule = {
    name: 'projects',
    title: 'Projects',
    optional: false,
    enabled: true,
    menus: [
        {
            title: 'Overview',
            path: '',
        },

        {
            title: 'Settings',
            path: 'settings',
        },
    ],

    settings: [
        {
            title: 'Information',
            path: 'information',
        },

        {
            title: 'Modules',
            path: 'modules',
        },
    ],
};
