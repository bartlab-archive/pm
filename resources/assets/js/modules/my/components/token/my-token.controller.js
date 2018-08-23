import ControllerBase from 'base/controller.base';
import moment from 'moment';

/**
 * @property {object} token
 * @property {MyService} myService
 */
export default class MyTokenController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog', 'myService'];
    }

    $onInit() {
        this.loadProcess = false;
    }

    refresh() {
        this.loadProcess = true;
        this.myService
            .refreshToken(this.token.action)
            .then((response) => {
                this.token = response.data.data;
                this.token.updated_on_from_now = moment(this.token.updated_on).fromNow(true);
            })
            .finally(() => {
                this.loadProcess = false;
            });
    }
}