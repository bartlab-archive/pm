import ComponentBase from "base/component.base";
import TrackersProjectSettingsController from './trackers-project-settings.controller';
import trackersProjectSettingsTemplate from './trackers-project-settings.html';

export default class TrackersProjectSettingsComponent extends ComponentBase {

    static get controller() {
        return TrackersProjectSettingsController;
    }

    static get template() {
        return trackersProjectSettingsTemplate;
    }

    static get bindings() {
        return {
            params: '='
        };
    }
}