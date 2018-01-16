import 'angular';
import GroupsConfig from './groups.config';
import GroupsService from './services/groups.service';
import groupsIndexComponent from './components/index/groups-index.component';
import groupsEditComponent from './components/edit/groups-edit.component';
import groupsNewComponent from './components/new/groups-new.component';

angular.module('app.modules.groups', [])
    .config(GroupsConfig.inst())
    .service('GroupsService', GroupsService)
    .component(groupsIndexComponent.name, groupsIndexComponent)
    .component(groupsEditComponent.name, groupsEditComponent)
    .component(groupsNewComponent.name, groupsNewComponent);