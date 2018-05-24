import ControllerBase from 'base/controller.base';

export default class WikiFormController extends ControllerBase {

    static get $inject() {
        return ['wikisService', 'projectsService', '$stateParams', '$filter', '$state', '$mdToast', '$q'];
    }

    $onInit() {
        this.isNew = !this.$stateParams.name;
        this.title = this.isNew ? 'New wiki page' : this.$stateParams.name;
        this.comments = '';

        this.page = {
            title: this.$stateParams.name,
            content: {
                text: '',
            },
            parent_id: undefined
        };

        this.load();
    }

    load() {
        this.loadProccess = true;

        return this.$q
            .all([
                this.wikisService.all(this.projectsService.getCurrentId()),
                !this.isNew ? this.wikisService.one(this.projectsService.getCurrentId(), this.$stateParams.name) : undefined
            ])
            .then(([list, page]) => {
                if (page && page.status !== 204) {
                    Object.assign(this.page, page.data.data);
                } else {
                    this.isNew = true;
                    if (this.$stateParams.name) {
                        this.page.content.text = '# ' + this.$stateParams.name;
                    }
                }

                // filter pages list by parent id for current page
                this.list = this.page.id ? list.filter((item) => {
                    return !item.parents_ids.some((id) => this.page.id === id);
                }) : list.data.data;

                this.loadProccess = false;
            });
    }

    submit() {
        const projectId = this.projectsService.getCurrentId();
        let model = {
            text: this.page.content.text,
            parent_id: this.page.parent_id,
            comments: this.comments,
            // todo: need post version?
            // version:
        };

        if (this.isNew) {
            model.title = this.page.title;
        }

        return (this.isNew ? this.wikisService.create(projectId, model) : this.wikisService.update(projectId, this.page.title, model))
            .then((response) => {
                this.$mdToast.show(
                    this.$mdToast.simple().textContent('Success saved!').position('bottom left')
                );

                this.$state.go('wiki.page.view', {name: response.data.data.title});
            })
            .catch((response) => {
                if (response.status === 422) {
                    this.$mdToast.show(
                        this.$mdToast.simple().textContent(response.data.message).position('bottom left')
                    );
                }

                this.errors = response.data.errors;
            });
    }

    cancel() {
        if (this.isNew) {
            this.$state.go('wiki.index');
        } else {
            this.$state.go('wiki.page.view', {name: this.page.title});
        }
    }

}