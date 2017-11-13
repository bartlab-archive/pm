import ServiceBase from "base/service.base";
import moment from 'moment';

/**
 * @property {Restangular} Restangular
 * @property {$cacheFactory} $cacheFactory
 */
export default class IssuesService extends ServiceBase {

    static get $inject() {
        return ['Restangular', '$cacheFactory'];
    }

    $onInit($injector) {
        this.cache = this.$cacheFactory('IssuesService');
    }

    one(identifier) {
        return this.Restangular.one('issues', identifier).get();
    }

    getListByProject(identifier, params) {
        return this.Restangular.one('projects', identifier).all('issues').post(params);
    }

    getList(params) {
        return this.Restangular.all('issues').getList(params);
    }

    getAdditionalInfo(params) {
        return this.Restangular.all('issues').one('info')
            .withHttpConfig({cache: this.cache})
            .get(params);
    }

    getIssuesFilters(params) {
        return this.Restangular.one('filters').get(params);
    }

    create(params) {
        return this.Restangular.all('issues').post(params);
    }

    update(issue) {
        return this.Restangular.all('issues').customPUT(issue, issue.id);
    }

    deleteIssue(issueId) {
        return this.Restangular.one('issues', issueId).remove();
    }

    getHistory(id) {
        return this.Restangular.one('issues', id).one('history').get();
    }

    watch(id) {
        return this.Restangular.one(`issues/${id}/watch`).post();
    }

    unwatch(id) {
        return this.Restangular.one(`issues/${id}/watch`).remove();
    }

    timeAgo(creationDate) {
        let daysAgo = moment().diff(moment(creationDate, 'YYYY-MM-DD'), 'days');
        const yearsAgo = Math.floor(daysAgo / 365);
        if (yearsAgo) {
            return yearsAgo === 1 ? 'year' : (yearsAgo + ' years');
        }

        daysAgo -= yearsAgo * 365;
        const monthsAgo = Math.floor(daysAgo / 30);
        daysAgo -= monthsAgo * 30;

        return (monthsAgo ? monthsAgo + ' months ' : '') + daysAgo + ' days';
    }

    getIssueStatuses(){
        return this.Restangular.one('issues').all('statuses').getList({});
    }
}