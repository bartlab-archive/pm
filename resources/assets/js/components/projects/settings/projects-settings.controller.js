import ControllerBase from 'base/controller.base';
import projectsMemberComponent from '../member/projects-member.component';
import showAddVersionComponent from 'components/modal/projects/versions/show-add-version/show-add-version.component';
import showEditVersionComponent from 'components/modal/projects/versions/show-edit-version/show-edit-version.component';
import showAddIssuesCategoryComponent from 'components/modal/projects/issue-categories/show-add-issue-category/show-add-issue-category.component';
import showEditIssuesCategoryComponent from 'components/modal/projects/issue-categories/show-edit-issue-category/show-edit-issue-category.component';
import showAddForumComponent from 'components/modal/projects/forums/show-add-forum/show-add-forum.component';
import showEditForumComponent from 'components/modal/projects/forums/show-edit-forum/show-edit-forum.component';
import _ from 'lodash';

/**
 * @property {ProjectsService} ProjectsService
 * @property {UsersService} UsersService
 * @property {EnumerationsService} EnumerationsService
 * @property {$stateParams} $stateParams
 * @property {$rootScope} $rootScope
 * @property {$mdDialog} $mdDialog
 * @property {$state} $state
 */
export default class ProjectsSettingsController extends ControllerBase {

    static get $inject() {
        return ['$mdToast','ProjectsService', 'UsersService', 'EnumerationsService', '$stateParams', '$rootScope', '$mdDialog', '$state'];
    }

    $onInit() {
        this.allModules = this.ProjectsService.modules;

        // active tab name
        this.page = this.$stateParams.page;

        // tabs for project modules
        this.tabs = {};

        this.versionStatuses = this.ProjectsService.getVersionStatuses();
        this.versionSharings = this.ProjectsService.getVersionSharings();

        this.EnumerationsService.getList({
            type: 'TimeEntryActivity'
        }).then((response) => {
            let activities = {};
            _.each(response.data, (v, k) => {
                activities[v.name] = _.pick(v, ['id', 'name', 'position', 'is_default', 'type', 'active', 'parent_id', 'position_name']);
            });

            this.defaultActivities = activities;
        });

        this.load();
        this.$rootScope.$on('updateProjectInfo', () => this.load());

        this.ProjectsService.getList().then((response) => {
            // const self = this;
            this.projects = response.data;
            // this.projects = _.filter(response.data, (item) => (item.identifier !== self.model.identifier));
        });

        this.repositories = [{
            scm: 'Filesystem',
            main: true,
            identifier: 'identifier 1',
            root: '/tmp',
            encoding: 'UTF-8'
        }, {
            scm: 'Filesystem',
            main: true,
            identifier: 'identifier 2',
            root: '/tmp',
            encoding: 'UTF-8'
        }];
    }

    load() {
        this.ProjectsService.one(this.$stateParams.project_id).then((response) => {
            this.model = _.get(response, 'data', []);

            this.model.modules = this.ProjectsService.getModules(this.model.enabled_modules);
            this.tabs = Object.assign([], this.model.modules);

            if (this.model.parent_project) {
                this.model.parent_identifier = this.model.parent_project.identifier;
                delete(this.model.parent_project.identifier);
            }

            this.members = this.ProjectsService.getMembersList(this.model);

            this.versions = this.getVersions();
            this.issuesCategories = this.getIssueCategories();
            this.forums = this.getForums();

            this.activities = this.getActivities();

            this.initialActivities = _.cloneDeep(this.activities);
        });
    }

    selectTab(page) {
        this.$state.go(
            '.',
            {page: page},
            {
                // prevent the events onStart and onSuccess from firing
                notify: false,
                // prevent reload of the current state
                reload: false,
                // replace the last record when changing the params so you don't hit the back button and get old params
                location: 'replace',
                // inherit the current params on the url
                inherit: true
            }
        )
    }

    getActivities() {
        let activities = _.cloneDeep(this.defaultActivities);
        _.each(this.model.enumerations, (v, k) => {
            activities[v.name] = v;
        });

        delete this.model.enumerations;

        return activities;
    }

    getForums() {
        const forums = _.map(this.model.boards, item => {
            return _.pick(item, ['id', 'name', 'description', 'parent_id']);
        });

        delete this.model.boards;

        return forums;
    }

    getIssueCategories() {
        const issueCategories = _.map(this.model.issue_categories, item => {
            return _.pick(item, ['id', 'name', 'assigned_to_id']);
        });

        delete this.model.issue_categories;

        return issueCategories;
    }

    getVersions() {
        const versions = _.map(this.model.versions, item => {
            return _.pick(item, ['id', 'name', 'description', 'effective_date', 'wiki_page_title', 'status', 'sharing']);
        });

        delete this.model.versions;

        return versions;
    }

    updateModules() {
        this.ProjectsService
            .updateModules(
                this.model.identifier,
                _.keys(_.pickBy(this.model.modules, (value, key) => value))
            )
            .then(() => {
                this.$mdToast.show(
                    this.$mdToast.simple().textContent('Success saved!').position('bottom left')
                );
                this.$rootScope.$emit('updateProjectInfo');
            });
    }


    updateInformation() {
        this.ProjectsService
            .updateInformation(
                this.model.identifier,
                _.pick(this.model, [
                    'name',
                    'description',
                    'homepage',
                    'parent_identifier',
                    'inherit_members'
                ])
            )
            .then(() => {
                this.$rootScope.$emit('updateProjectInfo');
            });
    }

    setMdDialogConfig(component, target, data = {}) {
        // let ctrlConfig = [].concat(
        //     component.controller.$inject || [],
        //     [(...args) => {
        //         let ctrl = new component.controller(...args);
        //
        //         // decorator
        //         _.each(data, (v, k) => {
        //             ctrl[k] = v;
        //         });
        //
        //         ctrl.$onInit && ctrl.$onInit();
        //         return ctrl;
        //     }]
        // );
        //
        // return {
        //     controller: ctrlConfig,
        //     controllerAs: '$ctrl',
        //     template: component.template,
        //     //panelClass: 'modal-custom-dialog',
        //     parent: angular.element(document.body),
        //     trapFocus: true,
        //     clickOutsideToClose: true,
        //     clickEscapeToClose: true,
        //     escapeToClose: true,
        //     hasBackdrop: true,
        //     disableParentScroll: true,
        //     openFrom: target,
        //     closeTo: target,
        // }

        // this.$mdDialog.show(

        // current project identifier
        data.identifier = this.model.identifier;

        return {
            controller: component.controller,
            controllerAs: '$ctrl',
            bindToController: true,
            locals: data,
            template: component.template,
            clickOutsideToClose: true,
            openFrom: target,
            closeTo: target,
        };
        // );
    }

    deleteMember(memberId, name) {
        let confirm = this.$mdDialog.confirm()
            .title('Do you want to delete "' + name + '" from project members?')
            .ok('Delete')
            .cancel('Cancel');

        this.$mdDialog.show(confirm).then(() => {
            this.ProjectsService
                .deleteMember(memberId)
                .then(() => {
                    this.$mdToast.show(
                        this.$mdToast.simple().textContent('Success delete!').position('bottom left')
                    );
                    this.$rootScope.$emit('updateProjectInfo');
                });
        });
    }

    editMember($event, memberId, roleId, userName) {
        this.$mdDialog.show(
            this.setMdDialogConfig(projectsMemberComponent, $event.target, {
                member: {
                    id: memberId,
                    roleId: roleId,
                    name: userName
                }
                // memberId: memberId,
                // roleId: roleId,
                // userName: userName
            })
        );
    }

    addMember($event) {
        this.$mdDialog.show(
            this.setMdDialogConfig(projectsMemberComponent, $event.target, {
                // identifier: this.model.identifier,
                // currentMembers: _.map(this.members, 'user_id')
            })
        );
    }

    addVersion($event) {
        this.$mdDialog.show(
            this.setMdDialogConfig(showAddVersionComponent, $event.target, {
                identifier: this.model.identifier,
                //currentMembers: _.map(this.members, 'user_id')
            })
        );
    }

    deleteVersion(versionId) {
        this.ProjectsService
            .deleteVersion(versionId)
            .then(() => {
                this.$rootScope.$emit('updateProjectInfo');
            });
    }

    versionWikiNavigate(wikiPageTitle) {
        this.$state.go('projects.inner.wiki.page', {name: wikiPageTitle});
    }

    editVersion($event, version) {
        this.$mdDialog.show(
            this.setMdDialogConfig(showEditVersionComponent, $event.target, {version: _.clone(version)})
        );
    }

    closeCompletedVersions() {
        this.ProjectsService
            .closeCompletedVersions(this.model.identifier)
            .then(() => {
                this.$rootScope.$emit('updateProjectInfo');
            });
    }

    createIssuesCategory($event) {
        this.$mdDialog.show(
            this.setMdDialogConfig(showAddIssuesCategoryComponent, $event.target, {
                identifier: this.model.identifier,
                currentMembers: _.omit(this.members, ['id', 'name'])
            })
        );
    }

    editIssuesCategory($event, issueCategory) {
        this.$mdDialog.show(
            this.setMdDialogConfig(showEditIssuesCategoryComponent, $event.target, {
                issueCategory: _.clone(issueCategory),
                currentMembers: _.omit(this.members, ['id', 'name'])
            })
        );
    }

    deleteIssuesCategory(issueCategoryId) {
        this.ProjectsService
            .deleteIssueCategory(issueCategoryId)
            .then(() => {
                this.$rootScope.$emit('updateProjectInfo');
            });
    }

    saveWiki() {
        this.ProjectsService
            .editWiki(this.model.wiki.id, _.pick(this.model.wiki, ['start_page']))
            .then(() => {
                this.$rootScope.$emit('updateProjectInfo');
            });
    }

    forumNavigate(forumId) {
        this.$state.go('projects.inner.boards', {id: forumId});
    }

    createForum($event) {
        this.$mdDialog.show(
            this.setMdDialogConfig(showAddForumComponent, $event.target, {
                identifier: this.model.identifier,
                currentProjectForums: _.omit(this.forums, ['id', 'name'])
            })
        );
    }

    editForum($event, forum) {
        this.$mdDialog.show(
            this.setMdDialogConfig(showEditForumComponent, $event.target, {
                forum: _.clone(forum),
                currentProjectForums: _.omit(this.forums, ['id', 'name', 'parent_id'])
            })
        );
    }

    deleteForum(forumId) {
        this.ProjectsService
            .deleteForum(forumId)
            .then(() => {
                this.$rootScope.$emit('updateProjectInfo');
            });
    }

    saveActivity() {
        const initialActivities = this.initialActivities;
        _.each(this.activities, (v, k) => {
            if (!v.parent_id && !v.active) {
                v.parent_id = v.id;
                delete v.id;
                this.ProjectsService.createActivity(this.model.identifier, v).then(() => {
                    this.$rootScope.$emit('updateProjectInfo');
                });
            } else if (v.parent_id && v.active !== initialActivities[v.name].active) {
                this.ProjectsService.editActivity(v.id, v).then(() => {
                    this.$rootScope.$emit('updateProjectInfo');
                });
            }
        });
    }

    resetActivity() {
        _.each(this.activities, (v, k) => {
            if (v.parent_id) {
                this.ProjectsService.deleteActivity(v.id).then(() => {
                    this.$rootScope.$emit('updateProjectInfo');
                });
            }
        });
    }

}