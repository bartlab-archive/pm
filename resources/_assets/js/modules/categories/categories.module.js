import 'angular';
import CategoriesConfig from './categories.config';
import CategoriesService from './services/categories.service';
import CategoriesProjectSettingsComponent from './components/project-settings/categories-project-settings.component';
import CategoriesFormComponent from './components/category/categories-form.component';

angular.module('app.modules.categories', [])
    .config(CategoriesConfig.inst())
    .service(CategoriesService.getName(), CategoriesService)
    .component(CategoriesProjectSettingsComponent.getName(), CategoriesProjectSettingsComponent)
    .component(CategoriesFormComponent.getName(), CategoriesFormComponent);
