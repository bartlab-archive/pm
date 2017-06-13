export default class myShowApiKeyController{
  static get $inject() {
    return ['$injector'];
  }

  constructor($injector) {
    this.$auth = $injector.get('$auth');
    this.$state = $injector.get('$state');
    this.toaster = $injector.get('$mdToast');
  }
}
