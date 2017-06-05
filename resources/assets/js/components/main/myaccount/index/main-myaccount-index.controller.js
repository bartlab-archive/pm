import angular from 'angular';

export default class mainMyAccountIndexController{
  static get $inject() {
    return ['$injector'];
  }

  constructor($injector) {
    this.$auth = $injector.get('$auth');
    this.$state = $injector.get('$state');
    this.toaster = $injector.get('$mdToast');

    this.LangugeService = $injector.get('LanguageService');

    this.languages = this.LangugeService.Language;
  }
}