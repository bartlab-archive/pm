import _ from 'lodash';
import ControllerBase from 'base/controller.base';

/**
 * @property ProjectsService
 * @property UsersService
 * @property $stateParams
 */
export default class ProjectsSettingsController extends ControllerBase {

    static get $inject() {
        return ['ProjectsService', 'UsersService', '$stateParams'];
    }

    $onInit() {
        this.modules = this.ProjectsService.modules;

        this.trackers = [
            {id: '4', name: 'Feature'},
            {id: '6', name: 'Bug'},
        ];

        this.ProjectsService.one(this.$stateParams.id).then((response) => {
            this.model = _.get(response, 'data', []);
        });

        this.ProjectsService.getList().then((response) => {
            this.projects = response.data;
        });
    }

    paginatorCallback(page, pageSize) {
        let offset = (page - 1) * pageSize;

        return this.UsersService.getList().then(function (response) {
            return {
                results: response.data,
                totalResultCount: response.data.length
            }
        });
    }

}