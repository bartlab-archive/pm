import 'angular';

import GroupsConfig from './groups.config';
import groupsIndexComponent from './index/groups-index.component';

angular.module('app.components.groups', [])
    .config(GroupsConfig.inst())
    .component(groupsIndexComponent.name, groupsIndexComponent);