import 'angular';
import VersionsConfig from './versions.config';
import VersionsInfoComponent from './components/info/versions-info.component';
import VersionsProjectSettingsComponent from './components/project-settings/versions-project-settings.component';
import VersionsNewComponent from './components/new/versions-new.component';

angular.module('app.modules.versions', [])
    .config(VersionsConfig.inst())

    // assigne version to project from project settings
    .component(VersionsNewComponent.getName(), VersionsNewComponent)

    .component(VersionsProjectSettingsComponent.getName(), VersionsProjectSettingsComponent)
    .component(VersionsInfoComponent.getName(), VersionsInfoComponent);