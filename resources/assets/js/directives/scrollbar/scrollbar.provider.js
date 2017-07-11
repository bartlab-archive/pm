import InjectableBase from "../../base/injectable.base";

export default class ScrollBarProvider extends InjectableBase{
    $onInit() {
        this.defaults = {
            scrollButtons: {
                enable: true //enable scrolling buttons by default
            },
            axis: 'yx' //enable 2 axis scrollbars by default
        };

        // TODO: can we do this without jquery?
        $.mCustomScrollbar.defaults.scrollButtons = this.defaults.scrollButtons;
        $.mCustomScrollbar.defaults.axis = this.defaults.axis;
    }

    setConfig(config){
        angular.extend(this.defaults, config);
    }

    $get() {
        return {
            defaults: this.defaults
        }
    }
}