
export default class mainMyAccountIndexController{
  static get $inject() {
    return ['$injector'];
  }

  constructor($injector) {
    this.$auth = $injector.get('$auth');
    this.$state = $injector.get('$state');
    this.toaster = $injector.get('$mdToast');

    this.UserSevice = $injector.get('UsersService');

    this.languages = this.UserSevice.getLanguage();

  }
}