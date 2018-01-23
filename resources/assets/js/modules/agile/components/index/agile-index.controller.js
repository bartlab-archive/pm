import ControllerBase from 'base/controller.base';

/**
 * @property {Object} $state
 */
export default class AgileIndexController extends ControllerBase {

    static get $inject() {
        return ['$state','StatusesService','IssuesService','$stateParams'];
    }


    $onInit() {

    }

}