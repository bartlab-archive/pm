import {AppModule} from '../../app/interfaces/module';

export const meta: AppModule = {
    name: 'issue_tracking',
    title: 'Issues',
    optional: true,
    enabled: true,
    menus: [
        {
            title: 'Issues',
            path: 'issues',
        },
    ],

    settings: [
        {
            title: 'Issues categories',
            path: 'issues/categories',
        },

        {
            title: 'Trackers',
            path: 'issues/trackers',
        },
    ],
};
