export default function layoutConfig($stateProvider) {
    $stateProvider
        .state('blank', {
            abstract: true,
            component: 'layoutBlank'
        })
        .state('default', {
            abstract: true,
            component: 'layoutDefault'
        });
}
layoutConfig.$inject = ['$stateProvider'];