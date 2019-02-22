import {AppModule} from '../../app/interfaces/module';

export const meta: AppModule = {
    name: 'users',
    title: 'Users',
    optional: false,
    enabled: true,
    menus: [
    ],

    settings: [
        {
            title: 'Members',
            path: 'users',
        },
    ],
};
