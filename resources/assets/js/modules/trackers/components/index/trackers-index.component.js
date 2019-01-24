import TrackersIndexController from './trackers-index.controller';
import trackersIndexTemplate from './trackers-index.html';
import ComponentBase from "base/component.base";

export default class TrackersIndexComponent extends ComponentBase {

    static get controller() {
        return TrackersIndexController;
    }

    static get template() {
        return trackersIndexTemplate;
    }
}