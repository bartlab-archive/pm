import ControllerBase from 'base/controller.base';

export default class ProjectsIssuesController extends ControllerBase {

    static get $inject() {
        return ['IssuesService', '$stateParams'];
    }

    $onInit() {
        const _this = this;
        _this.issues = paginatorCallback;
        function paginatorCallback(page, pageSize) {
            const offset = (page - 1) * pageSize;
            const options = {
                offset: offset,
                limit: pageSize
            };
            return _this.IssuesService.getListByProject(_this.$stateParams.id, options)
                .then((response) => {
                    this.data = response.data;
                    return {
                        results: response.data,
                        totalResultCount: 12
                    }
                })
                .catch(console.log);
        }
    }

    getWithId(id) {
        return _.find(this.data, function (item) {
            return item.id === id;
        });

    }
}