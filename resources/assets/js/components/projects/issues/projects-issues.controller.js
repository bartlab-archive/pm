import {NgTableParams} from 'ng-table';

export default class ProjectsIssuesController {

    static get $inject() {
        return ['$injector'];
    }

    constructor($injector) {
        this.IssuesService = $injector.get('IssuesService');
        this.$stateParams = $injector.get('$stateParams');
    }

    $onInit() {
        this.test = new NgTableParams({
            count:10
        }, {
            counts: [5, 10, 20],
            getData: (params)=> {
                return this.IssuesService.getListByProject(this.$stateParams.id).then((response)=>{
                    params.total(response.data.length);
                    return response.data;
                });
            }

        });
    }

}