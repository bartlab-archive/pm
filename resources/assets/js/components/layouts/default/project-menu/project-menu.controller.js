import ControllerBase from 'base/controller.base';
import angular from 'angular';
import * as _ from "lodash";

/**
 * @property $window
 * @property $timeout
 * @property $state
 */
export default class ProjectMenuController extends ControllerBase {

    static get $inject() {
        return ['$state', '$window', '$timeout'];
    }

    $onInit() {

        this.secondMenuItems = [
            {url: 'projects-inner.info', name: 'Overview'},
            {url: 'projects-inner.activity', name: 'Activity'},
            {url: 'projects-inner.issues.index', name: 'Issues'},
            {url: 'projects-inner.issues.gantt', name: 'Gantt'},
            {url: 'projects-inner.issues.calendar', name: 'Calendar'},
            {url: 'projects-inner.news', name: 'News'},
            {url: 'projects-inner.documents', name: 'Documents'},
            {url: 'projects-inner.wiki.index', name: 'Wiki'},
            {url: 'projects-inner.boards', name: 'Forums'},
            {url: 'projects-inner.files', name: 'Files'},
            {url: 'projects-inner.settings', name: 'Settings'}
        ];
    }

    goTo(url) {
        this.$state.go(url);
    }
}