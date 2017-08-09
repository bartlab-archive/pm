import _ from 'lodash';
import ControllerBase from 'base/controller.base';

/**
 * @property $mdSidenav
 * @property $stateParams
 * @property $state
 * @property ProjectsService
 */
export default class LayoutProjectController extends ControllerBase {

    static get $inject() {
        return ['$state', '$stateParams', 'ProjectsService'];
    }

    $onInit() {

        this.ProjectsService.one(this.$stateParams.project_id).then((response) => {
            this.items = _.get(response, 'data.enabled_modules', []);

            _.forEach(this.items, (item) => {
                switch (item.name) {
                    case 'issue_tracking' :
                        item.url = 'projects-inner.activity';
                        break;

                    case 'wiki' :
                        item.url = 'projects-inner.wiki.index';
                        break;

                    case 'files' :
                        item.url = 'projects-inner.files';
                        break;

                    case 'documents' :
                        item.url = 'projects-inner.documents';
                        break;

                    case 'calendar' :
                        item.url = 'projects-inner.issues.calendar';
                        break;

                    case 'gantt' :
                        item.url = 'projects-inner.issues.gantt';
                        break;

                    default :
                        item.url = 'projects-inner.info';
                        break;
                }
            });

            this.items.unshift({url: 'projects-inner.issues.index', name: 'Issues'});
            this.items.unshift({url: 'projects-inner.info', name: 'Overview'});
            this.items.push({url: 'projects-inner.settings', name: 'Settings'});
        });

        // this.items = [
        //     {url: 'projects-inner.info', name: 'Overview'},
        //     {url: 'projects-inner.activity', name: 'Activity'},
        //     {url: 'projects-inner.issues.index', name: 'Issues'},
        //     {url: 'projects-inner.issues.gantt', name: 'Gantt'},
        //     {url: 'projects-inner.issues.calendar', name: 'Calendar'},
        //     {url: 'projects-inner.news', name: 'News'},
        //     {url: 'projects-inner.documents', name: 'Documents'},
        //     {url: 'projects-inner.wiki.index', name: 'Wiki'},
        //     {url: 'projects-inner.boards', name: 'Forums'},
        //     {url: 'projects-inner.files', name: 'Files'},
        //     {url: 'projects-inner.settings', name: 'Settings'}
        // ];

        this.newItems = [
            {name: 'New issue', url: '', icon: 'create'},
            {name: 'New category', url: '', icon: 'folder'},
            {name: 'New version', url: '', icon: 'archive'},
            {name: 'New wiki page', url: '', icon: 'receipt'},
            {name: 'New file', url: '', icon: 'attach_file'},
        ];

        this.currentNavItem = _.get(
            _.find(this.items, {url: this.$state.current.name}),
            'url',
            this.items[0].url
        );

        this.menuOpen = false;

    }

    goto(url) {
        // this.$state.go(url);
        this.$state.go(url, {project_id: this.$stateParams.project_id});
    }

    openNewObjectMenu($mdMenu, $event) {
        $mdMenu.open($event);
    }

}