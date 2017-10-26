import 'angular';

import FieldsConfig from './fields.config';
import fieldsIndexComponent from './index/fields-index.component';

angular.module('app.components.fields', [])
    .config(FieldsConfig.inst())
    .component(fieldsIndexComponent.name, fieldsIndexComponent);