import 'angular';
import 'modules/main/main.module';
import 'modules/layouts/layouts.module';
import 'modules/projects/projects.module';
import 'modules/issues/issues.module';
import 'modules/users/users.module';
import 'modules/my/my.module'
import 'modules/admin/admin.module';
import 'modules/news/news.module';
import 'modules/groups/groups.module';
import 'modules/roles/roles.module';
import 'modules/trackers/trackers.module';
import 'modules/statuses/statuses.module';
import 'modules/workflows/workflows.module';
import 'modules/fields/fields.module';
import 'modules/enumerations/enumerations.module';
import 'modules/settings/settings.module';
import 'modules/auth/auth.module';
import 'modules/wiki/wiki.module';
import 'modules/versions/versions.module';
import 'modules/agile/agile.module';
import 'modules/calendar/calendar.module';
import 'modules/gantt/gantt.module';

angular.module('app.modules', [
    // core modules
    'app.modules.layouts',
    'app.modules.main',
    'app.modules.my',
    'app.modules.projects',
    'app.modules.users',
    'app.modules.admin',
    'app.modules.groups',
    'app.modules.roles',
    'app.modules.enumerations',
    'app.modules.settings',
    'app.modules.fields',
    'app.modules.versions',

    // additional modules
    'app.modules.issues',
    'app.modules.statuses',
    'app.modules.news',
    'app.modules.trackers',
    'app.modules.workflows',
    'app.modules.auth',
    'app.modules.wiki',
    'app.modules.agile',
    'app.modules.calendar',
    'app.modules.gantt',
]);
