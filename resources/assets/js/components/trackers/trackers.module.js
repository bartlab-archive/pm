import 'angular';

import TrackersConfig from './trackers.config';
import trackersIndexComponent from './index/trackers-index.component';

angular.module('app.components.trackers', [])
    .config(TrackersConfig.inst())
    .component(trackersIndexComponent.name, trackersIndexComponent);