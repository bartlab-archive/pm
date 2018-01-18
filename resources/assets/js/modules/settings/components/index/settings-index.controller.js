import ControllerBase from 'base/controller.base';

/**
 * @property {Object} $state
 */
export default class SettingsIndexController extends ControllerBase {

    static get $inject() {
        return ['$state','SettingsService'];
    }

    $onInit() {
        this.load();
    }

    load() {

        return  this.SettingsService.all()
            .getList()
            .then((response) => {
                response.data.forEach((item)=>{

                    // switch (item.name) {
                    //     case 'app_title': this.app_title = value;
                    // }

                });

            });
    }

    selectTab(page) {
        this.$state.go(
            '.',
            {page: page},
            {
                // prevent the events onStart and onSuccess from firing
                notify: false,
                // prevent reload of the current state
                reload: false,
                // replace the last record when changing the params so you don't hit the back button and get old params
                location: 'replace',
                // inherit the current params on the url
                inherit: true
            }
        )
    }

}