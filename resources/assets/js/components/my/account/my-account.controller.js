
export default class mainMyAccountController{
  static get $inject() {
    return ['$injector'];
  }

  constructor($injector) {
    this.$auth = $injector.get('$auth');
    this.$state = $injector.get('$state');
    this.toaster = $injector.get('$mdToast');

    this.UserSevice = $injector.get('UsersService');

    this.languages = this.UserSevice.getLanguage();

    this.user = this.UserSevice.getUserInfo();
  }
}