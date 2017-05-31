import {NgTableParams} from 'ng-table';

export default class ProjectsListController {

    static get $inject() {
        return ['$injector'];
    }

    constructor($injector) {
        this.ProjectsService = $injector.get('ProjectsService');
        //
        // this.list = new NgTableParams({
        //     // page: 1, // show first page
        //     // count: 10 // count per page
        // }, {
        //     // filterDelay: 300,
        //     getData: (params)=> {
        //         // ajax request to api
        //         // return Api.get(params.url()).$promise.then(function(data) {
        //         //     params.total(data.inlineCount);
        //         //     return data.results;
        //         // });
        //         return this.ProjectsService.getList().then((response)=>{
        //             return response.data;
        //         });
        //     }
        // });
    }

    $onInit() {
        this.ProjectsService.getList().then((response) => {
            this.list = response.data;
        });
        // console.log(this.ProjectsService.getList().data);
    }

}