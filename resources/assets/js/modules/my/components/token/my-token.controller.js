import ControllerBase from 'base/controller.base';

/**
 * @property {object} token
 * @property {MyService} myService
 */
export default class MyTokenController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog', 'myService'];
    }

    $onInit() {
        this.loadProccess = false;
    }

    refresh() {
        this.loadProccess = true;
        this.myService
            .refreshToken(this.token.action)
            .then((response) => {
                this.token = response.data.data;
            })
            .finally(() => {
                this.loadProccess = false;
            });
    }
}