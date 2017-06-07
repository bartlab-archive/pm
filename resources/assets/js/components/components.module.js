import 'angular';
import 'components/main/main.module';
import 'components/layouts/layouts.module';
import 'components/projects/projects.module';
import 'components/issues/issues.module';

angular.module('app.components', [
    'app.components.layouts',
    'app.components.main',
    'app.components.projects',
    'app.components.issues'
]);
