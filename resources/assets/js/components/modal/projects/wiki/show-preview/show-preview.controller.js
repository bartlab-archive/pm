import _ from 'lodash';
import ControllerBase from 'base/controller.base';


/**
 * @property {$mdDialog} $mdDialog
 * @property {ProjectsService} ProjectsService
 * @property {$rootScope} $rootScope
 * @property {RolesService} RolesService
 * @property {UsersService} UsersService
 */
export default class ShowPreviewController extends ControllerBase {
    static get $inject() {
        return ['$mdDialog', 'ProjectsService', '$rootScope', 'RolesService', 'UsersService'];
    }

    $onInit() {
    }

    cancel() {
        this.$mdDialog.cancel();
    }




}
