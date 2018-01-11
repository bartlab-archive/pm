import 'angular';
import FieldsConfig from './fields.config';
import fieldsIndexComponent from './components/index/fields-index.component';

angular.module('app.modules.fields', [])
    .config(FieldsConfig.inst())
    .component(fieldsIndexComponent.name, fieldsIndexComponent);