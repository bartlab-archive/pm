import DirectiveBase from 'base/directive.base';
import './scrollbar.scss';

export default class ScrollbarDirective extends DirectiveBase {

    static get selector() {
        return 'ngScrollbars';
    }

    static get $inject() {
        return ['ScrollBar'];
    }

    static render(defaults, configuredDefaults, elem) {
        elem.mCustomScrollbar('destroy');

        let config = {};
        if (this.ScrollBar) {
            config = this.ScrollBar;
        }

        // apply configured provider defaults only if the scope's config isn't defined (it has priority in that case)
        for (let setting in defaults) {
            if (defaults.hasOwnProperty(setting)) {

                switch (setting) {

                    case 'scrollButtons':
                        if (!config.hasOwnProperty(setting)) {
                            configuredDefaults.scrollButtons = defaults[setting];
                        }
                        break;

                    case 'axis':
                        if (!config.hasOwnProperty(setting)) {
                            configuredDefaults.axis = defaults[setting];
                        }
                        break;

                    default:
                        if (!config.hasOwnProperty(setting)) {
                            config[setting] = defaults[setting];
                        }
                        break;
                }
            }
        }

        elem.mCustomScrollbar(config);
    }

    $onInit() {
        this.restrict = 'EA';
    }

    link(scope, elem, attrs) {
        scope.elem = elem;

        let defaults = this.ScrollBar.defaults;
        let configuredDefaults = $.mCustomScrollbar.defaults;

        scope.ngScrollbarsUpdate = function () {
            elem.mCustomScrollbar.apply(elem, arguments);
        };

        scope.$watch('ngScrollbarsConfig', function (newVal, oldVal) {
            if (newVal !== undefined) {
                ScrollbarDirective.render(defaults, configuredDefaults, elem, scope);
            }
        });

        scope.$watch('ngScrollTo', function (newVal, oldVal) {
            if (newVal !== undefined) {
                elem.mCustomScrollbar('scrollTo', newVal);
                scope.ngScrollTo = undefined;
            }
        });

        ScrollbarDirective.render(defaults, configuredDefaults, elem);
    }

}