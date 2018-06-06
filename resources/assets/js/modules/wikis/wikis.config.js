import InjectableBase from 'base/injectable.base';
import WikisPageComponent from './components/page/wikis-page.component';
import WikisHistoryComponent from './components/history/wikis-history.component';
import WikisRenameComponent from './components/rename/wikis-rename.component';
import WikisFormComponent from './components/form/wikis-form.component';
import WikisIndexByComponent from './components/index-by/wikis-index-by.component';
import WikisProjectSettingsComponent from './components/project-settings/wikis-project-settings.component';

/**
 * @property {$stateProvider} $stateProvider
 * @property {$showdownProvider} $showdownProvider
 * @property {projectsServiceProvider} ProjectsServiceProvider
 * @property {mainServiceProvider} MainServiceProvider
 */
export default class WikisConfig extends InjectableBase {

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
                component: WikisProjectSettingsComponent.getName(),
                module: 'wiki'
            });

        // todo: check page exists. if page by link not found - add "parent" param to link
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
                // todo: upper case first char?
                url: '/{name:[^,./?;:|]+}',
                abstract: true,
            })
            .state('wiki.index', {
                url: '',
                component: WikisPageComponent.getName(),
            })
            .state('wiki.page.view', {
                url: '',
                component: WikisPageComponent.getName(),
            })
            .state('wiki.page.edit', {
                url: '/edit',
                component: WikisFormComponent.getName(),
            })
            .state('wiki.page.history', {
                url: '/history',
                component: WikisHistoryComponent.getName(),
            })
            .state('wiki.page.rename', {
                url: '/rename',
                component: WikisRenameComponent.getName(),
            })
            .state('wiki.new', {
                url: '/new',
                component: WikisFormComponent.getName(),
            })
            .state('wiki.index-by-title', {
                url: '/index',
                component: WikisIndexByComponent.getName(),
            })
            .state('wiki.index-by-date', {
                url: '/date_index',
                component: WikisIndexByComponent.getName(),
            });
    }

}