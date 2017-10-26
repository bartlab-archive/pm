import 'angular';
import 'components/main/main.module';
import 'components/layouts/layouts.module';
import 'components/projects/projects.module';
import 'components/issues/issues.module';
import 'components/users/users.module';
import 'components/my/my.module'
import 'components/admin/admin.module';
import 'components/news/news.module';
import 'components/groups/groups.module';
import 'components/roles/roles.module';
import 'components/trackers/trackers.module';
import 'components/statuses/statuses.module';
import 'components/workflows/workflows.module';
import 'components/fields/fields.module';
import 'components/enumerations/enumerations.module';
import 'components/settings/settings.module';
import 'components/auth/auth.module';

angular.module('app.components', [
    'app.components.layouts',
    'app.components.main',
    'app.components.projects',
    'app.components.issues',
    'app.components.projects',
    'app.components.my',
    'app.components.users',
    'app.components.admin',
    'app.components.news',
    'app.components.groups',
    'app.components.roles',
    'app.components.trackers',
    'app.components.statuses',
    'app.components.workflows',
    'app.components.fields',
    'app.components.enumerations',
    'app.components.settings',
    'app.components.auth',
]);
