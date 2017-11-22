import 'angular';

import TrackersConfig from './trackers.config';
import TrackersIndexComponent from './index/trackers-index.component';

angular.module('app.components.trackers', [])
    .config(TrackersConfig.inst())
    .component(TrackersIndexComponent.name, TrackersIndexComponent);