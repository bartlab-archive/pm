export default class myShowApiKeyController{
  static get $inject() {
    return ['$injector'];
  }

  constructor($injector) {
    this.UserService = $injector.get('UsersService');

    this.UserService.getApiAccessKey().then((result) => {
      this.apiKey = result.data.api_key;
    });

  }
}
