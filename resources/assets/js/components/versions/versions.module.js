import 'angular';

import VersionsConfig from './versions.config';
import versionsInfoComponent from './info/versions-info.component';

angular.module('app.components.versions', [])
    .config(VersionsConfig.inst())
    .component(versionsInfoComponent.name, versionsInfoComponent);