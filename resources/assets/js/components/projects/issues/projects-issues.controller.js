import ControllerBase from 'base/controller.base';
import * as _ from "lodash";

export default class ProjectsIssuesController extends ControllerBase {

    static get $inject() {
        return ['$mdToast', '$mdSidenav', 'IssuesService', '$stateParams'];
    }

    $onInit() {
        this.toggleLeft = this.buildDelayedToggler('left');
        this.toggleRight = this.buildToggler('right');
        this.isOpenRight = function () {
            return this.$mdSidenav('right').isOpen();
        };
        this.issues = this.paginatorCallback;

    }

    selectedRowCallback(rows) {
        this.$mdToast.show(
            this.$mdToast.simple()
                .content('Selected row id(s): ' + rows)
                .hideDelay(3000)
        );
    };

    paginatorCallback(page, pageSize, opt) {
        const sortBy = this.sortBy(opt.columnSort);
        const offset = (page - 1) * pageSize;
        const options = {
            offset: offset,
            limit: pageSize,
            sortField: sortBy.field,
            order: sortBy.sort
        };
        return this.IssuesService.getListByProject(this.$stateParams.id, options)
            .then((response) => {
                this.data = response.data[0].issues;
                return {
                    results: response.data[0].issues,
                    totalResultCount: response.headers('x-total')
                }
            })
            .catch(console.log);
    }

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
            if (options[i].sort != false) {
                result.field = fields[i];
                result.sort = options[i].sort;
            }
        });
        return result;

    }

    buildDelayedToggler(navID) {
        return this.debounce(function () {
            this.$mdSidenav(navID)
                .toggle();
        }, 200);
    }

    buildToggler(navID) {
        return function () {
            this.$mdSidenav(navID)
                .toggle();
        };
    }

    close() {
        this.$mdSidenav('right').close();
    };

    isOpenRight() {
        return this.$mdSidenav('right').isOpen();
    };

    debounce(func, wait, context) {
        let timer;

        return function debounced() {
            const context = this,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function () {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }

}