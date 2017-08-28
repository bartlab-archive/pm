import _ from 'lodash';
import ControllerBase from 'base/controller.base';

/**
 * @property {ProjectsService} ProjectsService
 * @property {UsersService} UsersService
 * @property {$stateParams} $stateParams
 * @property {$rootScope} $rootScope
 */
export default class ProjectsSettingsController extends ControllerBase {

    static get $inject() {
        return ['ProjectsService', 'UsersService', '$stateParams', '$rootScope'];
    }

    $onInit() {
        this.allModules = this.ProjectsService.modules;

        this.trackers = [
            {id: '4', name: 'Feature'},
            {id: '6', name: 'Bug'},
        ];

        this.ProjectsService.one(this.$stateParams.project_id).then((response) => {
            this.model = _.get(response, 'data', []);
            this.model.modules = this.ProjectsService.getModules(this.model.enabled_modules);
        });

        this.ProjectsService.getList().then((response) => {
            const self = this;
            this.projects = _.filter(response.data, (item) => (item.identifier !== self.model.identifier));
        });

        this.members = [
            {name: 'developer', role: 'manager'},
            {name: 'developer', role: 'manager'}
        ];

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

    updateModules() {
        this.ProjectsService
            .updateModules(
                this.model.identifier,
                _.keys(_.pickBy(this.model.modules, (value, key) => value))
            )
            .then(() => {
                this.$rootScope.$emit('layoutDefaultUpdateProjectInfo');
            });
    }

    updateInformation() {
        this.ProjectsService
            .updateInformation(
                this.model.identifier, {
                    name: this.model.name,
                    description: this.model.description,
                    homepage: this.model.homepage,
                    is_public: this.model.public,
                    parent_identifier: this.model.parent,
                    inherit_members: this.model.inherit_members,
                }
            )
            .then(() => {
                this.$rootScope.$emit('layoutDefaultUpdateProjectInfo');
            });
    }
}