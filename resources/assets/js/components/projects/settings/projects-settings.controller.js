import _ from 'lodash';
import ControllerBase from 'base/controller.base';
import showEditMemberComponent from 'components/modal/projects/members/show-edit-member/show-edit-member.component';
import showAddMemberComponent from 'components/modal/projects/members/show-add-member/show-add-member.component';

/**
 * @property {ProjectsService} ProjectsService
 * @property {UsersService} UsersService
 * @property {$stateParams} $stateParams
 * @property {$rootScope} $rootScope
 * @property {$mdDialog} $mdDialog
 */
export default class ProjectsSettingsController extends ControllerBase {

    static get $inject() {
        return ['ProjectsService', 'UsersService', '$stateParams', '$rootScope', '$mdDialog'];
    }

    $onInit() {
        this.allModules = this.ProjectsService.modules;

        this.trackers = [
            {id: '4', name: 'Feature'},
            {id: '6', name: 'Bug'},
        ];

        this.load();
        this.$rootScope.$on('updateProjectInfo', () => this.load());

        this.ProjectsService.getList().then((response) => {
            const self = this;
            this.projects = _.filter(response.data, (item) => (item.identifier !== self.model.identifier));
        });

        this.issuesCategories = [
            {name: 'category 1', assignee: 'developer'},
            {name: 'category 2', assignee: 'developer'}
        ];

        this.versions = [
            {
                name: 'version 1',
                date: '06/16/2017',
                description: 'description',
                status: 'open',
                sharing: 'Not shared',
                wiki: 'wiki',
            },
            {
                name: 'version 2',
                date: '06/16/2017',
                description: 'description',
                status: 'open',
                sharing: 'Not shared',
                wiki: 'wiki',
            }
        ];

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
            this.model.inherit_members = this.model.inherit_members !== 0;

            this.model.modules = this.ProjectsService.getModules(this.model.enabled_modules);

            this.model.parent_identifier = this.model.parent_project.identifier;
            this.members = this.getMembersList();
        });
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
}