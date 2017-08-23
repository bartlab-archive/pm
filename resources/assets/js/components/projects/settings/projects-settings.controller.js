import _ from 'lodash';
import ControllerBase from 'base/controller.base';

/**
 * @property ProjectsService
 * @property UsersService
 * @property $stateParams
 * @property $rootScope
 */
export default class ProjectsSettingsController extends ControllerBase {

    static get $inject() {
        return ['ProjectsService', 'UsersService', '$stateParams','$rootScope'];
    }

    $onInit() {
        this.allModules = this.ProjectsService.modules;

        this.trackers = [
            {id: '4', name: 'Feature'},
            {id: '6', name: 'Bug'},
        ];

        this.ProjectsService.one(this.$stateParams.project_id).then((response) => {
            this.model = _.get(response, 'data', []);
            this.model.modules =this.ProjectsService.getModules(this.model.enabled_modules);
        });

        this.ProjectsService.getList().then((response) => {
            this.projects = response.data;
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
        // let requestData = [];
        //
        // if( typeof this.model.module !== 'undefined'){
        //     _.forEach(this.model.module, (value, key) => {
        //         value ? requestData.push(key) : null;
        //     });
        // }

        // let requestData = _.find(this.model.ena);
        // console.log(
        //     _.keys(
        //         _.pickBy(this.model.module,(value, key)=> value)
        //     )
        // );

        this.ProjectsService
            .updateModules(
                this.model.identifier,
                _.keys(_.pickBy(this.model.modules,(value, key)=> value))
            )
            .then(()=>{
                this.$rootScope.$emit('layoutDefaultUpdateProjectInfo');
            });
    }


    // paginatorCallback(page, pageSize) {
    //     let offset = (page - 1) * pageSize;
    //
    //     return this.UsersService.getList().then(function (response) {
    //         return {
    //             results: response.data,
    //             totalResultCount: response.data.length
    //         }
    //     });
    // }

}