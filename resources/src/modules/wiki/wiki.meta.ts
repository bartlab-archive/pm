import {AppModule} from '../../app/interfaces/module';

export const meta: AppModule = {
    name: 'wiki',
    title: 'Wiki',
    optional: true,
    enabled: true,
    menus: [
        {
            title: 'Wiki',
            path: 'wiki',
        },
    ],

    settings: [
        {
            title: 'Wiki',
            path: 'wiki',
        },
    ],
};
