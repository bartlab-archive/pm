
export default class MaterialToastService {

    static get $inject() {
        return ['$injector'];
    }


    constructor($injector) {
        this.toaster = $injector.get('$mdToast');
    }

    success() {
        this.toaster.show({
            position: 'bottom right',
            template: '<md-toast>' +
            '<div class="md-toast-content">' +
            'This is a success preset' +
            '</div>' +
            '</md-toast>',
            controllerAs: 'toast',
            bindToController: true
        });
    }


}