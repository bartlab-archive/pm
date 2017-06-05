MainMyAccountConfig.$inject = ['$stateProvider'];

export default function MainMyAccountConfig($stateProvider) {
  $stateProvider
    .state('my-account', {
      abstract: true,
      parent: 'default',
      url: '/my-account',
      views: {
        content: {
          template: '<ui-view/>'
        }
      }
    })
    .state('index', {
      parent: 'my-account',
      url: '',
      component: 'mainMyAccountIndexComponent',
    })
    .state('change-password', {
      parent: 'my-account',
      url: '/change-password',
      component: 'mainMyAccountChangePasswordComponent',
    });
}

