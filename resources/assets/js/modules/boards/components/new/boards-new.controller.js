import ControllerBase from 'base/controller.base';
import _ from 'lodash';

/**
 * @property {$mdDialog} $mdDialog
 * @property {ProjectsService} ProjectsService
 * @property {$rootScope} $rootScope
 * @property {RolesService} RolesService
 * @property {UsersService} UsersService
 */
export default class BoardsNewController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog', '$mdToast', 'projectsService', '$rootScope'];
    }

    $onInit() {
        // if project identifier not set - close dialog
        if (!this.identifier) {
            this.cancel();
        }

        this.currentProjectForums = this.filterCurrentProjectForums();
        this.initailForum = _.clone(this.forum);
    }

    cancel(update) {
        this.$mdDialog.cancel();

        if (update) {
            this.$mdToast.show(
                this.$mdToast.simple().textContent('Success saved!').position('bottom left')
            );
            this.$rootScope.$emit('updateProjectInfo');
        }
    }

    submit() {
        if (!this.forum.id) {
            this.projectsService.createForum(this.identifier, this.forum)
                .then(() => this.cancel(true));
        } else {
            this.projectsService.editForum(this.forum.id, this.forum)
                .then(() => this.cancel(true));
        }
    }

    filterCurrentProjectForums() {
        let currentProjectForums = {};
        const self = this;

        _.each(this.currentProjectForums, (v, k) => {
            v.id !== self.forum.id ? currentProjectForums[v.id] = v : null;
        });

        return _.filter(currentProjectForums, (currentObject) => {
            return !self.childHasThisParentId(self.forum.id, currentObject.parent_id, currentProjectForums);
        });
    }

    childHasThisParentId(idToFind, parentId, currentProjectForums) {
        if (!parentId) {
            return false;
        } else if (idToFind === parentId) {
            return true;
        } else {
            return this.childHasThisParentId(idToFind, currentProjectForums[parentId].parent_id, currentProjectForums);
        }
    }

}
