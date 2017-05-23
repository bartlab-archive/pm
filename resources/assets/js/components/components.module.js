import 'angular';
import 'components/main/main.module';
import 'components/layouts/layouts.module';

angular.module('app.components', [
    'app.components.layouts',
    'app.components.main'
]);
