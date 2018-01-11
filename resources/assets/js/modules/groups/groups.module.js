import 'angular';
import GroupsConfig from './groups.config';
import groupsIndexComponent from './components/index/groups-index.component';

angular.module('app.modules.groups', [])
    .config(GroupsConfig.inst())
    .component(groupsIndexComponent.name, groupsIndexComponent);