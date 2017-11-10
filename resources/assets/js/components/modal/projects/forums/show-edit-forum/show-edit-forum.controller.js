import _ from 'lodash';
import ControllerBase from 'base/controller.base';

/**
 * @property {$mdDialog} $mdDialog
 * @property {ProjectsService} ProjectsService
 * @property {$rootScope} $rootScope
 */
export default class showEditVersionController extends ControllerBase {
    static get $inject() {
        return ['$mdDialog', 'ProjectsService', '$rootScope'];
    }

    $onInit() {
        this.currentProjectForums = this.filterCurrentProjectForums();
        this.initailForum = _.clone(this.forum);
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

    cancel() {
        this.$mdDialog.cancel();
    }

    editForum() {
        this.ProjectsService.editForum(this.forum.id, this.forum)
            .then(() => {
                this.$mdDialog.cancel();
                this.$rootScope.$emit('updateProjectInfo');
            });
    }

    isDisabledSaveBtn() {
        return _.isEqual(this.initailForum, this.forum);
    }
}
