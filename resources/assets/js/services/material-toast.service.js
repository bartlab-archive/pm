import successTemplate from './toaster-templates/toaster-success.html'

export default class MaterialToastService {

    static get $inject() {
        return ['$injector'];
    }


    constructor($injector) {
        this.toaster = $injector.get('$mdToast');
    }

    success() {
        this.showToaster(successTemplate);
    }

    error() {

    }

    showToaster(template, position = 'bottom right') {
        this.toaster.show({
            hideDelay: 170000,
            position: position,
            template: template,
            controllerAs: 'toast',
            bindToController: true
        });
    }


}