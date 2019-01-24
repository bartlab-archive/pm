import 'angular';
import GroupsConfig from './groups.config';
import GroupsService from './services/groups.service';
import GroupsIndexComponent from './components/index/groups-index.component';
import GroupsEditComponent from './components/edit/groups-edit.component';
import GroupsNewComponent from './components/new/groups-new.component';

angular.module('app.modules.groups', [])
    .config(GroupsConfig.inst())
    .service(GroupsService.getName(), GroupsService)
    .component(GroupsIndexComponent.getName(), GroupsIndexComponent)
    .component(GroupsEditComponent.getName(), GroupsEditComponent)
    .component(GroupsNewComponent.getName(), GroupsNewComponent);