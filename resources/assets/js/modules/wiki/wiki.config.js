import InjectableBase from 'base/injectable.base';
import WikiPageComponent from './components/page/wiki-page.component';
import WikiHistoryComponent from './components/history/wiki-history.component';
import WikiRenameComponent from './components/rename/wiki-rename.component';
// import WikiEditComponent from './components/edit/wiki-edit.component';
import WikiFormComponent from './components/form/wiki-form.component';
import WikiIndexByComponent from './components/index-by/wiki-index-by.component';
import WikiProjectSettingsComponent from './components/project-settings/wiki-project-settings.component';

/**
 * @property {$stateProvider} $stateProvider
 * @property {$showdownProvider} $showdownProvider
 * @property {object} ProjectsServiceProvider
 * @property {object} MainServiceProvider
 */
export default class WikiConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', '$showdownProvider', 'projectsServiceProvider', 'mainServiceProvider'];
    }

    $onInit() {
        this.mainServiceProvider
            .registerNewItemMenu({
                name: 'Wiki page',
                url: 'wiki.new',
                icon: 'receipt',
                module: 'wiki',
                single: false,
                enable: false
            });

        this.projectsServiceProvider
            .registerModule({
                url: 'wiki.index',
                title: 'Wiki',
                name: 'wiki',
                enable: false,
                alt: [/^wiki\.*/]
            })
            .registerSettings({
                url: 'wiki',
                name: 'Wiki',
                component: WikiProjectSettingsComponent.getName(),
                module: 'wiki'
            });

        this.$showdownProvider.loadExtension({
            type: 'lang',
            regex: /\[\[(.*)\]\]/g,
            replace: (full, string) => {
                let match = string.match(/(([a-z\-_]+)[:])?([^|#]+)?([#]([^|:]+))?([|](.+))?/i);

                // [2] - project, [3] - page, [5] - anchor, [7] - text
                if (match && ((match[2] || match[3]) || match[5])) {
                    let stateParams = {};

                    if (match[2]) {
                        stateParams.project_id = match[2];
                    }

                    if (match[3]) {
                        stateParams.name = match[3].replace(' ', '_').replace(/[,./?;:]/, '');
                    }

                    if (match[5]) {
                        stateParams['#'] = match[5].replace(' ', '-').replace(/[,./?;:]/, '');
                    }

                    let href = this.$stateProvider.$get().href(
                        'wiki.page.view',
                        stateParams
                    );

                    return '<a href="' + href + '">' + (match[7] ? match[7] : match[3]) + '</a>';
                }

                return full;
            }
        });

        this.$stateProvider
            .state('wiki', {
                abstract: true,
                url: '/wiki',
                parent: 'projects.inner'
            })
            .state('wiki.page', {
                url: '/{name:[^,./?;:|]+}',
                abstract: true,
            })
            .state('wiki.index', {
                url: '',
                component: WikiPageComponent.getName(),
            })
            .state('wiki.page.view', {
                url: '',
                component: WikiPageComponent.getName(),
            })
            .state('wiki.page.edit', {
                url: '/edit',
                component: WikiFormComponent.getName(),
            })
            .state('wiki.page.history', {
                url: '/history',
                component: WikiHistoryComponent.getName(),
            })
            .state('wiki.page.rename', {
                url: '/rename',
                component: WikiRenameComponent.getName(),
            })
            .state('wiki.new', {
                url: '/new',
                component: WikiFormComponent.getName(),
            })
            .state('wiki.index-by-title', {
                url: '/index',
                component: WikiIndexByComponent.getName(),
            })
            .state('wiki.index-by-date', {
                url: '/date_index',
                component: WikiIndexByComponent.getName(),
            });
    }

}