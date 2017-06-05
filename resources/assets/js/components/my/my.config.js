MyConfig.$inject = ['$stateProvider'];

export default function MyConfig($stateProvider) {
  $stateProvider
    .state('my', {
      abstract:true,
      parent: 'default',
      url: '/my',
      // data: {
      //   access: '@'
      // },
      views: {
        content: {
          template: '<ui-view/>'
        }
      }
    })
    .state('account', {
      parent: 'my',
      url: '/account',
      component: 'myAccountComponent',
    })
    .state('change-password', {
      parent: 'my',
      url: '/change-password',
      component: 'myChangePasswordComponent',
    });

}