import ControllerBase from 'base/controller.base';

/**
 * @property {Object} $state
 */
export default class WorkflowsIndexController extends ControllerBase {

    static get $inject() {
        return ['$state'];
    }

    $onInit() {

    }

    // selectTab(page) {
    //     this.$state.go(
    //         '.',
    //         {page: page},
    //         {
    //             // prevent the events onStart and onSuccess from firing
    //             notify: false,
    //             // prevent reload of the current state
    //             reload: false,
    //             // replace the last record when changing the params so you don't hit the back button and get old params
    //             location: 'replace',
    //             // inherit the current params on the url
    //             inherit: true
    //         }
    //     )
    // }

}