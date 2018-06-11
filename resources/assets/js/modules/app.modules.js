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
import 'modules/workflows/workflows.module';
import 'modules/fields/fields.module';
import 'modules/enumerations/enumerations.module';
import 'modules/settings/settings.module';
import 'modules/auth/auth.module';
import 'modules/wikis/wikis.module';
import 'modules/versions/versions.module';
// import 'modules/agile/agile.module';
import 'modules/calendar/calendar.module';
import 'modules/gantt/gantt.module';
import 'modules/boards/boards.module';
import 'modules/documents/documents.module';
import 'modules/repository/repository.module';
import 'modules/files/files.module';
import 'modules/activity/activity.module';
import 'modules/times/times.module';

angular.module('app.modules', [
    // core modules
    'app.modules.layouts',
    'app.modules.main',
    'app.modules.my',
    'app.modules.admin',
    'app.modules.projects',
    'app.modules.users',
    'app.modules.groups',
    'app.modules.roles',
    'app.modules.enumerations',
    'app.modules.settings',
    'app.modules.fields',
    'app.modules.versions',
    'app.modules.activity',

    // additional modules
    'app.modules.issues',
    // 'app.modules.statuses',
    'app.modules.news',
    'app.modules.trackers',
    'app.modules.workflows',
    'app.modules.auth',
    'app.modules.wikis',
    // 'app.modules.agile',
    'app.modules.calendar',
    'app.modules.gantt',
    'app.modules.boards',
    'app.modules.documents',
    'app.modules.repository',
    'app.modules.files',
    'app.modules.times'
]);
