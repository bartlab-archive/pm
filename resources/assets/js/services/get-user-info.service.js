export default class GetUserInfoService {

  static get $inject() {
    return ['$injector'];
  }

  constructor($injector) {

    this.$auth = $injector.get('$auth');
    this.$auth.getUserInfo
      .then(this.response = response);
  }

}