import 'angular';
import FieldsConfig from './fields.config';
import FieldsService from './services/fields.service';
import fieldsIndexComponent from './components/index/fields-index.component';

angular.module('app.modules.fields', [])
    .config(FieldsConfig.inst())
    .service('FieldsService', FieldsService)
    .component(fieldsIndexComponent.name, fieldsIndexComponent);