
import ControllerBase from 'base/controller.base';

export default class IssuesListController extends ControllerBase {

    static get $inject() {
        return ['IssuesService', '$stateParams'];
    }

    $onInit() {
        const _this = this;
        _this.issues = paginatorCallback;
        function paginatorCallback(page, pageSize, opt) {
            const sortBy = this.sortBy(opt.columnSort);
            const offset = (page - 1) * pageSize;
            const options = {
                offset: offset,
                limit: pageSize,
                sortField: sortBy.field,
                order: sortBy.sort
            };
            return _this.IssuesService.getList(options)
                .then((response) => {
                    this.data = response.data;
                    return {
                        results: response.data,
                        totalResultCount: response.headers('x-total')
                    }
                })
                .catch(console.log);
        }
    }

    selectedRowCallback(rows){
        this.$mdToast.show(
            this.$mdToast.simple()
                .content('Selected row id(s): '+rows)
                .hideDelay(3000)
        );
    };

    sortBy(options) {
        const fields = [
            'id',
            'tracker_id',
            'status_id',
            'priority_id',
            'subject',
            'full_name',
            'updated_on'
        ];
        const result = {
            field: '',
            sort: ''
        };
        options.forEach(function (item, i, options) {
            if(options[i].sort != false)
            {
                result.field = fields[i];
                result.sort = options[i].sort;
            }
        });
        return result;

    }

}