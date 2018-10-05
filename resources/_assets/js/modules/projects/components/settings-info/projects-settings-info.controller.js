import ControllerBase from 'base/controller.base';
import _ from "lodash";

/**
 * @property {ProjectsService} ProjectsService
 */
export default class ProjectsSettingsInfoController extends ControllerBase {

    static get $inject() {
        return ['projectsService', '$mdToast', '$state', '$rootScope'];
    }

    $onInit() {
        this.errors = {};
        this.form = null;
    }

    submit() {
        this.projectsService
            .update(
                this.projectsService.getCurrentId(),
                {
                    name: this.params.name,
                    description: this.params.description,
                    homepage: this.params.homepage,
                    is_public: this.params.is_public,
                    // todo: change field name?
                    parent_identifier: this.params.parent_identifier,
                    inherit_members: this.params.inherit_members,
                }
            )
            .then(() => {
                this.$mdToast.show(
                    this.$mdToast.simple()
                        .textContent('Project updated successfully')
                );

                this.$rootScope.$emit('updateProjectInfo');
            })
            .catch((response) => {
                this.errors = _.get(response, 'data.errors', {});
            });

    }

}