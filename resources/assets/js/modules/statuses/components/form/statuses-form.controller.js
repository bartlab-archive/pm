import ControllerBase from 'base/controller.base';

/**
 * @property {StatusesService} statusesService
 */
export default class StatusesFormController extends ControllerBase {

    static get $inject() {
        return ['statusesService', '$state', '$mdToast', '$stateParams'];
    }

    $onInit() {
        this.loadProcess = false;
        this.status = {
            id: this.$stateParams.id,
            name: undefined,
            is_closed: false
        };

        if (this.status.id) {
            this.load();
        }
    }

    load() {
        this.loadProcess = true;

        return this.statusesService
            .one(this.status.id)
            .then((response) => {
                Object.assign(this.status, response.data.data);
            })
            .finally(() => {
                this.loadProcess = false;
            });
    }

    submit() {
        this.loadProcess = true;

        const model = {
            name: this.status.name,
            is_closed: this.status.is_closed,
        };

        (this.status.id ? this.statusesService.update(this.status.id, model) : this.statusesService.create(model))
            .then(() => {
                this.$mdToast.show(
                    this.$mdToast.simple().textContent(
                        this.status.id ? 'Successful update.' : 'Successful creation.'
                    )
                );

                this.cancel();
            })
            .catch((response) => {
                if (response.status === 422) {
                    this.$mdToast.show(
                        this.$mdToast.simple().textContent(response.data.message)
                    );
                }

                this.errors = response.data.errors;
            })
            .finally(() => {
                this.loadProcess = false;
            });
    }

    cancel() {
        this.$state.go('issues-statuses.index');
    }
}