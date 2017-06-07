export default class myShowApiKeyController{
  static get $inject() {
    return ['$injector'];
  }

  constructor($injector) {
    this.UserService = $injector.get('UsersService');

    this.UserService.getApiAccesKey().then((result) => {
      this.apiKey = result;
    });

  }
}
