import 'angular';
import VersionsConfig from './versions.config';
import versionsInfoComponent from './components/info/versions-info.component';
import versionsProjectSettingsComponent from './components/project-settings/versions-project-settings.component';
import versionsNewComponent from './components/new/versions-new.component';

angular.module('app.modules.versions', [])
    .config(VersionsConfig.inst())

    // assigne version to project from project settings
    .component(versionsNewComponent.name, versionsNewComponent)

    .component(versionsProjectSettingsComponent.name, versionsProjectSettingsComponent)
    .component(versionsInfoComponent.name, versionsInfoComponent);