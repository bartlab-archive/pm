import _ from 'lodash';
import ControllerBase from 'base/controller.base';
import showEditMemberComponent from 'components/modal/projects/members/show-edit-member/show-edit-member.component';
import showAddMemberComponent from 'components/modal/projects/members/show-add-member/show-add-member.component';
import showAddVersionComponent from 'components/modal/projects/versions/show-add-version/show-add-version.component';
import showEditVersionComponent from 'components/modal/projects/versions/show-edit-version/show-edit-version.component';
import showAddIssuesCategoryComponent from 'components/modal/projects/issue-categories/show-add-issue-category/show-add-issue-category.component';
import showEditIssuesCategoryComponent from 'components/modal/projects/issue-categories/show-edit-issue-category/show-edit-issue-category.component';

/**
 * @property {ProjectsService} ProjectsService
 * @property {UsersService} UsersService
 * @property {$stateParams} $stateParams
 * @property {$rootScope} $rootScope
 * @property {$mdDialog} $mdDialog
 * @property {$state} $state
 */
export default class ProjectsSettingsController extends ControllerBase {

    static get $inject() {
        return ['ProjectsService', 'UsersService', '$stateParams', '$rootScope', '$mdDialog', '$state'];
    }

    $onInit() {
        this.allModules = this.ProjectsService.modules;

        this.trackers = [
            {id: '4', name: 'Feature'},
            {id: '6', name: 'Bug'},
        ];

        this.versionStatuses = this.ProjectsService.getVersionStatuses();
        this.versionSharings = this.ProjectsService.getVersionSharings();

        this.load();
        this.$rootScope.$on('updateProjectInfo', () => this.load());

        this.ProjectsService.getList().then((response) => {
            const self = this;
            this.projects = _.filter(response.data, (item) => (item.identifier !== self.model.identifier));
        });


        this.repositories = [
            {
                scm: 'Filesystem',
                main: true,
                identifier: 'identifier 1',
                root: '/tmp',
                encoding: 'UTF-8'
            },
            {
                scm: 'Filesystem',
                main: true,
                identifier: 'identifier 2',
                root: '/tmp',
                encoding: 'UTF-8'
            }
        ];

        this.forums = [
            {
                name: 'Board 1',
                description: 'description',
                parent: ''
            },
            {
                name: 'Board 2',
                description: 'description',
                parent: ''
            }
        ];

        this.activities = [
            {
                name: 'Architech',
                system: true,
                active: true
            },
            {
                name: 'Develop',
                system: true,
                active: true
            },
        ];
    }

    load() {
        this.ProjectsService.one(this.$stateParams.project_id).then((response) => {
            this.model = _.get(response, 'data', []);
            this.model.inherit_members = !!+this.model.inherit_members;

            this.model.modules = this.ProjectsService.getModules(this.model.enabled_modules);

            this.model.parent_identifier = this.model.parent_project.identifier;
            delete(this.model.parent_project.identifier);
            this.members = this.getMembersList();
            this.versions = this.getVersions();
            this.issuesCategories = this.getIssueCategories();
        });
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
        let ctrlConfig = [].concat(
            component.controller.$inject || [],
            [(...args) => {
                let ctrl = new component.controller(...args);

                // decorator
                _.each(data, (v, k) => {
                    ctrl[k] = v;
                });

                ctrl.$onInit && ctrl.$onInit();
                return ctrl;
            }]
        );

        return {
            controller: ctrlConfig,
            controllerAs: '$ctrl',
            template: component.template,
            //panelClass: 'modal-custom-dialog',
            parent: angular.element(document.body),
            trapFocus: true,
            clickOutsideToClose: true,
            clickEscapeToClose: true,
            escapeToClose: true,
            hasBackdrop: true,
            disableParentScroll: true,
            openFrom: target,
            closeTo: target,
        }
    }

    addMember($event) {
        this.$mdDialog.show(
            this.setMdDialogConfig(showAddMemberComponent, $event.target)
        );
    }

    getMembersList() {
        let members = {};
        _.forEach(this.model.members, (member, key) => {
            members[member.user_id] = {
                name: member.users.firstname + ' ' + member.users.lastname,
                role: member.member_roles.roles.name,
                role_id: member.member_roles.roles.id,
                user_id: member.users.id,
                member_id: member.id,
                inherited_member: false,
            };
        });

        delete this.model.members;

        if (this.model.parent_project && this.model.inherit_members) {
            _.forEach(this.model.parent_project.members, (member, key) => {
                members[member.user_id] = {
                    name: member.users.firstname + ' ' + member.users.lastname,
                    role: member.member_roles.roles.name,
                    role_id: member.member_roles.roles.id,
                    user_id: member.users.id,
                    member_id: member.id,
                    inherited_member: true,
                };
            });
        }

        delete this.model.parent_project.members;

        return members;
    }

    deleteMember(memberId) {
        this.ProjectsService
            .deleteMember(memberId)
            .then(() => {
                this.$rootScope.$emit('updateProjectInfo');
            });
    }

    editMember($event, memberId, roleId, userName) {
        this.$mdDialog.show(
            this.setMdDialogConfig(showEditMemberComponent, $event.target, {
                memberId: memberId,
                roleId: roleId,
                userName: userName
            })
        );
    }

    addMember($event) {
        this.$mdDialog.show(
            this.setMdDialogConfig(showAddMemberComponent, $event.target, {
                identifier: this.model.identifier,
                currentMembers: _.map(this.members, 'user_id')
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
            .deleteMember(versionId)
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

    saveWiki(){
        this.ProjectsService
            .editWiki(this.model.wiki.id, _.pick(this.model.wiki, ['start_page']))
            .then(() => {
                this.$rootScope.$emit('updateProjectInfo');
            });
    }
}