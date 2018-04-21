import 'angular';
import TrackersConfig from './trackers.config';
import TrackersService from './services/trackers.service';
import TrackersIndexComponent from './components/index/trackers-index.component';

angular.module('app.modules.trackers', [])
    .config(TrackersConfig.inst())
    .service(TrackersService.getName(), TrackersService)
    .component(TrackersIndexComponent.getName(), TrackersIndexComponent);