import InjectableBase from 'base/injectable.base';
import CategoriesProjectSettingsComponent from './components/project-settings/categories-project-settings.component';
import CategoriesFormComponent from './components/category/categories-form.component';

/**
 * @property {$stateProvider} $stateProvider
 * @property {ProjectsServiceProvider} projectsServiceProvider
 * @property {MainServiceProvider} mainServiceProvider
 */
export default class CategoriesConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'projectsServiceProvider', 'mainServiceProvider'];
    }

    $onInit() {
        this.projects();
        this.main();
        this.states();
    }

    projects() {
        this.projectsServiceProvider
            .registerSettings({
                url: 'categories',
                name: 'Issue categories',
                component: CategoriesProjectSettingsComponent.getName(),
                module: 'issue_tracking'
            });
    }

    main() {
        this.mainServiceProvider
            .registerNewItemMenu({
                name: 'Category',
                url: 'issues-inner.categories.new',
                icon: 'folder',
                module: 'issue_tracking',
                single: false,
                enable: false
            });
    }

    states() {
        this.$stateProvider
        // todo: redirect to /settings/categories in project
            .state('issues-categories', {
                abstract: true,
                data: {
                    layout: {
                        insideProject: true
                    }
                },
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                },
                url: '/issue_categories'
            })
            // todo: redirect to /settings/categories in project
            .state('issues-categories.item', {
                // redirect: '',
                abstract: true,
                url: '/{id}'
            })
            .state('issues-categories.item.edit', {
                url: '/edit',
                component: CategoriesFormComponent.getName()
            })
            .state('issues-categories-inner', {
                abstract: true,
                url: '/issue_categories',
                data: {
                    layout: {
                        insideProject: true
                    }
                },
                parent: 'projects.inner',
            })
            .state('issues-categories-inner.new', {
                url: '/new',
                component: CategoriesFormComponent.getName()
            })
    }
}

