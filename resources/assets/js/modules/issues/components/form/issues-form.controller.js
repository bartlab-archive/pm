import ControllerBase from 'base/controller.base';
import _ from 'lodash';
import moment from 'moment';

/*
todo: check field due_date as required if start_date filled
todo: check server validate for watchers
todo: check server validate for Private and Private notes switch
 */

/**
 * @property {IssuesService} issuesService
 * @property {AttachmentService} attachmentService
 * @property {$stateParams} $stateParams
 * @property {ProjectsService} projectsService
 * @property {EnumerationsService} enumerationsService
 * @property {$rootScope} $rootScope
 * @property {$q} $q
 * @property {$state} $state
 */
export default class IssuesFormController extends ControllerBase {

    static get $inject() {
        return [
            'issuesService', 'attachmentService', '$stateParams', 'projectsService', '$rootScope', '$q',
            'enumerationsService', '$mdToast', '$filter', '$state', '$http', '$scope'
        ];
    }

    $onInit() {
        this.issue = {
            id: this.$stateParams.id,
            done_ratio: 0,
            project: {
                identifier: this.projectsService.getCurrentId()
            },
            watchers: [],
            new_attachments: []
        };

        this.categories = [];
        this.searchText = '';
        this.watchers = [];
        this.isNew = (this.$state.current.name === 'issues-inner.copy' || !this.issue.id);
        this.title = !this.isNew ? '#' : 'New issue';
        this.showDescription = this.isNew;
        this.files = [];
        this.filesLoading = false;
        // cache state for ng-if
        // this.buttonsStateCreate = !this.isNew();
        // this.loadProccess = true;
        this.load();
    }

    // isCopy() {
    //     return this.$state.current.name === 'issues-inner.copy';
    // }

    // isNew(test = 0) {
    //     console.log(test);
    //     return this.isCopy() || !this.issue.id;
    // }

    preview() {
        // todo: make preview issue
    }

    load() {
        this.loadProccess = true;
        return this.$q
            .all([
                this.projectsService.all(),
                (this.$stateParams.id ? this.issuesService.one(this.issue.id) : undefined),
                this.issuesService.statuses(),
                this.enumerationsService.all({type: 'IssuePriority'}),
            ])
            .then((response) => {
                // todo: destruct respomse array
                this.projects = _.get(response, '0.data.data');
                this.issue = Object.assign(this.issue, _.get(response, '1.data.data'));
                this.statuses = _.get(response, '2.data.data');
                this.priorities = _.get(response, '3.data.data');
                this.watchers = this.issue.watchers.map((watcher) => {
                    return {
                        user: watcher
                    }
                });

                if (!this.isNew) {
                    // todo: create title by template and check data exists
                    this.title = this.issue.tracker.name + ' #' + this.issue.id + ': ' + this.issue.subject;

                    this.projectsService.setCurrentId(this.issue.project.identifier);
                    this.$rootScope.$emit('updateProjectInfo');
                } else {
                    this.issue.id = undefined;
                    this.issue.priority_id = _.get(
                        _.find(this.priorities, 'is_default'),
                        'id'
                    );
                }

                this.loadProccess = false;
                this.changeProject();
            });
    }

    changeProject(fromSelect = false) {
        if (this.issue.project.identifier) {
            this.selectedProject = this.projects.find((project) => project.identifier === this.issue.project.identifier);
        } else {
            this.selectedProject = _.first(this.projects);
            this.issue.project.identifier = _.get(this.selectedProject, 'identifier');
        }

        if (!this.issue.id || fromSelect) {
            // todo: save tracker/state if edit/copt issue and id's exists
            this.issue.tracker_id = _.get(this.selectedProject, 'trackers.0.id');
            this.issue.status_id = _.get(this.selectedProject, 'trackers.0.default_status_id');
        }

        // todo: save/add assigned to issue user if edit

        if (this.selectedProject.identifier) {
            this.issuesService.categories(this.selectedProject.identifier).then((response) => {
                this.categories = response.data.data;
            });
        }
    }

    querySearch() {
        let items = _.get(this.selectedProject, 'members', [])
                .filter((e) => !this.watchers.some((watcher) => watcher.user.id === e.user.id)),
            query = this.searchText.toLowerCase();

        if (!query) {
            return items;
        }

        return items.filter((e) => e.user.full_name.toLowerCase().indexOf(query) !== -1);
    }

    submit(createAndContinue = false) {
        let model = {
            // id: 2402,
            tracker_id: this.issue.tracker_id,
            subject: this.issue.subject,
            description: this.issue.description,
            due_date: this.issue.due_date ? moment(this.issue.due_date).format('YYYY-MM-DD') : null,
            category_id: this.issue.category_id,
            status_id: this.issue.status_id,
            assigned_to_id: this.issue.assigned_to_id,
            priority_id: this.issue.priority_id,
            // fixed_version_id: this.issue.fixed_version_id,
            // author_id: this.issue.tracker_id,
            // lock_version: this.issue.tracker_id,
            // created_on: '',
            // updated_on: '',
            start_date: this.issue.start_date ? moment(this.issue.start_date).format('YYYY-MM-DD') : null,
            done_ratio: this.issue.done_ratio,
            estimated_hours: this.issue.estimated_hours,
            parent_id: this.issue.parent_id,
            // root_id: this.issue.tracker_id,
            is_private: this.issue.is_private,
            // closed_on: null
            project_identifier: this.issue.project.identifier,
            new_attachments: this.issue.new_attachments,
            watchers: this.watchers.map((watcher) => watcher.user.id),
        };

        if (!this.isNew) {
            model.notes = this.notes;
            model.private_notes = this.notes_private;
        }

        (this.isNew ? this.issuesService.create(model) : this.issuesService.update(this.issue.id, model))
            .then((response) => {
                const id = response.data.data.id;
                // todo: make link for #id in message or button "open" in toast message
                const message = this.isNew ? 'Issue #' + id + ' created.' : 'Successful update.';

                this.$mdToast.show(
                    this.$mdToast.simple().textContent(message)
                );

                this.$state.go(
                    createAndContinue ? 'issues-inner.new' : 'issues.info',
                    // todo: get project identifier from response
                    createAndContinue ? {project_id: this.issue.project.identifier} : {id},
                    // {reload: true, inherit: false, notify: true}
                    createAndContinue ? {reload: false, inherit: false, notify: true} : undefined
                );
            })
            .catch((response) => {
                if (response.status === 422) {
                    this.$mdToast.show(
                        this.$mdToast.simple().textContent(response.data.message)
                    );
                }

                this.errors = response.data.errors;
            });
    }

    sendFile(fileData) {

        let fd = new FormData();
        fd.append("file_content", fileData.file_content);
        fd.append("file_name", fileData.file_name);
        fd.append("file_type", fileData.file_type);
        fd.append("file_chunk_id", fileData.file_chunk_id);
        fd.append("chunk_amount", fileData.chunk_amount);
        fd.append("file_total_size", fileData.file_total_size);
        if(fileData.description) {
            fd.append("description", fileData.description);
        }

        this.attachmentService.create(fd)
            .then((response) => {
                let attachmentId = _.get(response, 'data.data.id');
                if(attachmentId) {
                    this.issue.new_attachments.push(attachmentId);
                    let loadedFile = this.files.findIndex((el) => {
                        return el.name == fileData.file_name;
                    });
                    this.files[loadedFile].hasLoaded = true;
                    this.files[loadedFile].id = attachmentId;
                    this.filesLoading = !this.files.every((file) => file.hasLoaded);

                    this.$mdToast.show(
                        this.$mdToast.simple().textContent(`File ${fileData.file_name} successfully loaded.`)
                    );
                }
            }).catch((error) => {
                this.$mdToast.show(
                    this.$mdToast.simple().textContent(`Error was occurred while uploading file ${fileData.file_name}.`)
                );
            });
    }

    upload() {

        let fileChunkSize = 1000000;
        this.filesLoading = true;

        this.files.forEach((file, index) => {

            // exclude already loaded files
            if(file.hasLoaded) {
                return;
            }

            let filePartsNumber = Math.floor(file._file.size / fileChunkSize) + 1;

            for(let i = 0; i < filePartsNumber; i++) {
                let filePart = file._file.slice(i * fileChunkSize, (i + 1) * fileChunkSize);
                let payload = {
                    file_name: file._file.name,
                    file_type: file._file.type,
                    file_size: filePart.size,
                    file_total_size: file.size,
                    file_content: filePart,
                    file_chunk_id: i,
                    chunk_amount: filePartsNumber,
                    description: file.description
                };
                this.sendFile(payload);
            }

        });

    }

    triggerFileLoadButton() {
        document.getElementById("files-upload").click();
        // angular.element(document.getElementById("files-upload")).trigger("click")
    }

    deleteAttachment(attachmentId, fileName,  assigned) {

        let localId;

        if(assigned) {
            localId = this.issue.attachments.findIndex((attachment) => attachment.id == attachmentId);
        } else {
            localId = this.files.findIndex((file) => file.id == attachmentId);

            if(!this.files[localId].hasLoaded) {
                this.files.splice(localId, 1);
                return;
            }
        }

        this.attachmentService.remove(attachmentId)
            .then((response) => {
                // remove from visible lists
                assigned ? this.issue.attachments.splice(localId, 1) : this.files.splice(localId, 1);
                // remove from prepared to save list of ids
                this.issue.new_attachments = this.issue.new_attachments.filter(function(preparedAttachmentId) {
                    return preparedAttachmentId !== attachmentId
                });

                this.$mdToast.show(
                    this.$mdToast.simple().textContent(`File ${fileName} successfully deleted.`)
                );

            })
            .catch((error) => {
                this.$mdToast.show(
                    this.$mdToast.simple().textContent(`Error was occurred while deleting file ${fileName}.`)
                );
            });

    }

    updateAttachment(attachment, assigned) {
        let fileName = assigned ? attachment.filename : attachment.name;

        this.attachmentService.update(attachment.id, {filename: fileName, description: attachment.description})
            .then((response) => {
                this.$mdToast.show(
                    this.$mdToast.simple().textContent(`File ${fileName} successfully updated.`)
                );

            })
            .catch((error) => {
                this.$mdToast.show(
                    this.$mdToast.simple().textContent(`Error was occurred while updating attachment.`)
                );
            });
    }

    cancel() {
        if (this.$stateParams.id) {
            this.$state.go('issues.info', {id: this.$stateParams.id});
        } else {
            const projectId = this.projectsService.getCurrentId();
            this.$state.go((projectId ? 'issues-inner' : 'issues') + '.list', {project_id: projectId});
        }
    }

}