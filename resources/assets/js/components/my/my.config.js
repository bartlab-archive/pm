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
    .state('my.account', {
      url: '/account',
      component: 'myAccountComponent',
    })
    .state('my.password', {
      url: '/password',
      component: 'myPasswordComponent',
    });

}