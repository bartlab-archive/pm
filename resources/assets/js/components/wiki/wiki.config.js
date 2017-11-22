import InjectableBase from 'base/injectable.base';
import wikiPageComponent from './page/wiki-page.component';
import wikiEditComponent from './edit/wiki-edit.component';
import wikiIndexByComponent from './index-by/wiki-index-by.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class WikiConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', '$showdownProvider'];
    }

    $onInit() {
        this.$showdownProvider.loadExtension({
            type: 'lang',
            regex: /\[\[(.*)\]\]/g,
            replace: (full, string) => {
                let match = string.match(/(([a-z\-_]+)[:])?([^|#]+)?([#]([^|:]+))?([|](.+))?/i);

                // [2] - project, [3] - page, [5] - anchor, [7] - text
                if (match && ((match[2] || match[3]) || match[5] )) {
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
                component: wikiPageComponent.name,
            })
            .state('wiki.page.view', {
                url: '',
                component: wikiPageComponent.name,
            })
            .state('wiki.page.edit', {
                url: '/edit',
                component: wikiEditComponent.name,
            })
            .state('wiki.new', {
                url: '/new',
                component: wikiEditComponent.name,
            })
            .state('wiki.index-by-title', {
                url: '/index',
                component: wikiIndexByComponent.name,
            })
            .state('wiki.index-by-date', {
                url: '/date_index',
                component: wikiIndexByComponent.name,
            });
    }

}