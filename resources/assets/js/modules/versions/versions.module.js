import 'angular';
import VersionsConfig from './versions.config';
import versionsInfoComponent from './components/info/versions-info.component';

angular.module('app.modules.versions', [])
    .config(VersionsConfig.inst())
    .component(versionsInfoComponent.name, versionsInfoComponent);