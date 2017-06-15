import 'angular';
import 'components/main/main.module';
import 'components/layouts/layouts.module';
import 'components/projects/projects.module';
import 'components/issues/issues.module';
import 'components/users/users.module';
import 'components/my/my.module'
import 'components/admin/admin.module';

angular.module('app.components', [
    'app.components.layouts',
    'app.components.main',
    'app.components.projects',
    'app.components.issues',
    'app.components.projects',
    'app.components.my',
    'app.components.users',
    'app.components.admin'
]);
