import 'angular';
import 'components/main/main.module';
import 'components/layouts/layouts.module';
import 'components/projects/projects.module';
import 'components/users/users.module';
import 'components/my/my.module'

angular.module('app.components', [
    'app.components.layouts',
    'app.components.main',
    'app.components.projects',
    'app.components.users'
    'app.components.projects',
    'app.components.my',
]);
