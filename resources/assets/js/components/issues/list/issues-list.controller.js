import {NgTableParams} from 'ng-table';

export default class IssuesListController {

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
                    return this.IssuesService.getList().then((response) => {
                        params.total(response.data.length);
                        return  response.data;
                })
            }
        });
    }

}