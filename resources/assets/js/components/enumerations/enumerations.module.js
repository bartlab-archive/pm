import 'angular';

import EenumerationsConfig from './enumerations.config';
import enumerationsIndexComponent from './index/enumerations-index.component';

angular.module('app.components.enumerations', [])
    .config(EenumerationsConfig.inst())
    .component(enumerationsIndexComponent.name, enumerationsIndexComponent);