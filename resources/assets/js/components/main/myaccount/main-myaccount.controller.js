import angular from 'angular';

export default class mainMyAccountController{
  static get $inject() {
    return ['$injector'];
  }

  constructor($injector) {
    this.$auth = $injector.get('$auth');
    this.$state = $injector.get('$state');
    this.toaster = $injector.get('$mdToast');

    this.languages = [
      {
        id: 1,
        name: 'English'
      },
      {
        id: 2,
        name: 'Spanish'
      },
      {
        id: 3,
        name: 'Ukraine'
      }
    ];
  }
}