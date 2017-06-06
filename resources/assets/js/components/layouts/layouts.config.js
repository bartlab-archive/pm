layoutConfig.$inject = ['$stateProvider'];

export default function layoutConfig($stateProvider) {
    $stateProvider
        .state('blank', {
            abstract: true,
            component: 'layoutBlankComponent'
        })
        .state('default', {
            abstract: true,
            component: 'layoutDefaultComponent'
        });
}