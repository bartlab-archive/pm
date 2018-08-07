import ControllerBase from 'base/controller.base';
import _ from 'lodash';
import moment from 'moment';

/*
todo: check field due_date as required if start_date filled
todo: check server validate for watchers
todo: check server validate for Private and Private notes switch
todo: check app settings for "Allow issue assignment to groups" and show/hide groups in assigned list
 */

/**
 * @property {CategoriesService} categorisService
 * @property {AttachmentService} attachmentService
 * @property {$stateParams} $stateParams
 * @property {ProjectsService} projectsService
 * @property {EnumerationsService} enumerationsService
 * @property {$rootScope} $rootScope
 * @property {$q} $q
 * @property {$state} $state
 * @property {TrackersService} trackersService
 * @property {StatusesService} statusesService
 */
export default class IssuesFormController extends ControllerBase {

    static get $inject() {
        return [
            'issuesService', 'attachmentService', '$stateParams', 'projectsService', '$rootScope', '$q',
            'enumerationsService', '$mdToast', '$filter', '$state', '$http', '$scope', 'authService',
            'trackersService', 'statusesService', 'categoriesService'
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
            tracker: {},
            status: {},
            priority: {},
            // new_attachments: []
        };

        this.categories = [];
        this.searchText = '';
        this.watchers = [];
        this.trackers = [];
        this.statuses = [];
        this.priorities = [];
        this.isNew = (this.$state.current.name === 'issues-inner.copy' || !this.issue.id);
        this.title = !this.isNew ? '#' : 'New issue';
        this.showDescription = this.isNew;
        this.selectedProject = undefined;
        // this.files = [];
        // this.filesLoading = false;
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
                this.projectsService.all((this.authService.isAdmin() ? undefined : {my: true})),
                this.statusesService.all(),
                this.enumerationsService.all('IssuePriority'),
                (this.issue.id ? this.issuesService.one(this.issue.id) : undefined),
                // this.trackersService.all(),
            ])
            .then(([projects, statuses, priorities, issue]) => {
                this.projects = projects.data.data;
                this.statuses = statuses.data.data;
                this.priorities = priorities.data.data;
                this.issue = Object.assign(this.issue, _.get(issue, 'data.data'));
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
                    this.issue.priority = this.priorities.find((priority) => priority.is_default === true);
                }


                return this.changeProject();
            })
            .finally(() => {
                this.loadProccess = false;
            })
    }

    changeProject(reset = false) {
        // get project from projects list by identifier
        if (this.issue.project.identifier) {
            this.selectedProject = this.projects.find((project) => project.identifier === this.issue.project.identifier);
        }

        this.selectedProject = this.selectedProject || _.first(this.projects);
        if (!this.issue.project.identifier) {
            this.issue.project.identifier = _.get(this.selectedProject, 'identifier');
        }

        if (this.selectedProject) {
            this.trackersService.all(this.selectedProject.identifier).then((response) => {
                this.trackers = response.data.data;

                if (!this.issue.tracker.id || !this.trackers.some((tracker) => tracker.id === this.issue.tracker.id)) {
                    this.issue.tracker = _.first(this.trackers);
                }

                // todo: get statuses by workflow in tracker
                // todo: set done_ratio by tracker

                if (!this.issue.status.id || !this.statuses.some((status) => status.id === this.issue.status.id)) {
                    this.issue.status = this.statuses.find((status) => status.id === this.issue.tracker.default_status_id);
                }
            });

            this.categoriesService.all(this.selectedProject.identifier).then((response) => {
                this.categories = response.data.data;
            });
        }
    }

    // changeProject2(fromSelect = false) {
    //     if (this.issue.project.identifier) {
    //         this.selectedProject = this.projects.find((project) => project.identifier === this.issue.project.identifier);
    //     } else {
    //         this.selectedProject = _.first(this.projects);
    //         this.issue.project.identifier = _.get(this.selectedProject, 'identifier');
    //     }
    //
    //     // if (!this.issue.id || fromSelect) {
    //     if (fromSelect) {
    //         // todo: save tracker/state if edit/copt issue and id's exists
    //         this.trackersService.all(this.selectedProject.identifier).then((response) => {
    //             this.trackers = response.data.data;
    //             this.issue.tracker = _.first(this.trackers);
    //             this.issue.status = this.statuses.find((status) => status.id === this.issue.tracker.default_status_id);
    //             // this.issue.status = _.get(response, 'data.data.0.default_status_id');
    //         });
    //     }
    //     // }
    //
    //     // todo: save/add assigned to issue user if edit
    //
    //     if (this.selectedProject.identifier) {
    //         this.issuesService.categories(this.selectedProject.identifier).then((response) => {
    //             this.categories = response.data.data;
    //         });
    //     }
    // }

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
            tracker_id: this.issue.tracker.id,
            subject: this.issue.subject,
            description: this.issue.description,
            due_date: this.issue.due_date ? moment(this.issue.due_date).format('YYYY-MM-DD') : null,
            category_id: this.issue.category ? this.issue.category.id : null,
            status_id: this.issue.status.id,
            assigned_to_id: this.issue.assigned ? this.issue.assigned.id : null,
            priority_id: this.issue.priority.id,
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
            // new_attachments: this.issue.new_attachments,
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

    // sendFile(fileData) {
    //
    //     let fd = new FormData();
    //     fd.append("file_content", fileData.file_content);
    //     fd.append("file_name", fileData.file_name);
    //     fd.append("file_type", fileData.file_type);
    //     fd.append("file_chunk_id", fileData.file_chunk_id);
    //     fd.append("chunk_amount", fileData.chunk_amount);
    //     fd.append("file_total_size", fileData.file_total_size);
    //     if (fileData.description) {
    //         fd.append("description", fileData.description);
    //     }
    //
    //     this.attachmentService.create(fd)
    //         .then((response) => {
    //             let attachmentId = _.get(response, 'data.data.id');
    //             if (attachmentId) {
    //                 this.issue.new_attachments.push(attachmentId);
    //                 let loadedFile = this.files.findIndex((el) => {
    //                     return el.name == fileData.file_name;
    //                 });
    //                 this.files[loadedFile].hasLoaded = true;
    //                 this.files[loadedFile].id = attachmentId;
    //                 this.filesLoading = !this.files.every((file) => file.hasLoaded);
    //
    //                 this.$mdToast.show(
    //                     this.$mdToast.simple().textContent(`File ${fileData.file_name} successfully loaded.`)
    //                 );
    //             }
    //         }).catch((error) => {
    //         this.$mdToast.show(
    //             this.$mdToast.simple().textContent(`Error was occurred while uploading file ${fileData.file_name}.`)
    //         );
    //     });
    // }
    //
    // upload() {
    //
    //     let fileChunkSize = 1000000;
    //     this.filesLoading = true;
    //
    //     this.files.forEach((file, index) => {
    //
    //         // exclude already loaded files
    //         if (file.hasLoaded) {
    //             return;
    //         }
    //
    //         let filePartsNumber = Math.floor(file._file.size / fileChunkSize) + 1;
    //
    //         for (let i = 0; i < filePartsNumber; i++) {
    //             let filePart = file._file.slice(i * fileChunkSize, (i + 1) * fileChunkSize);
    //             let payload = {
    //                 file_name: file._file.name,
    //                 file_type: file._file.type,
    //                 file_size: filePart.size,
    //                 file_total_size: file.size,
    //                 file_content: filePart,
    //                 file_chunk_id: i,
    //                 chunk_amount: filePartsNumber,
    //                 description: file.description
    //             };
    //             this.sendFile(payload);
    //         }
    //
    //     });
    //
    // }

    // triggerFileLoadButton() {
    //     document.getElementById("files-upload").click();
    // angular.element(document.getElementById("files-upload")).trigger("click")
    // }

    // deleteAttachment(attachmentId, fileName, assigned) {
    //
    //     let localId;
    //
    //     if (assigned) {
    //         localId = this.issue.attachments.findIndex((attachment) => attachment.id == attachmentId);
    //     } else {
    //         localId = this.files.findIndex((file) => file.id == attachmentId);
    //
    //         if (!this.files[localId].hasLoaded) {
    //             this.files.splice(localId, 1);
    //             return;
    //         }
    //     }
    //
    //     this.attachmentService.remove(attachmentId)
    //         .then((response) => {
    //             // remove from visible lists
    //             assigned ? this.issue.attachments.splice(localId, 1) : this.files.splice(localId, 1);
    //             // remove from prepared to save list of ids
    //             this.issue.new_attachments = this.issue.new_attachments.filter(function (preparedAttachmentId) {
    //                 return preparedAttachmentId !== attachmentId
    //             });
    //
    //             this.$mdToast.show(
    //                 this.$mdToast.simple().textContent(`File ${fileName} successfully deleted.`)
    //             );
    //
    //         })
    //         .catch((error) => {
    //             this.$mdToast.show(
    //                 this.$mdToast.simple().textContent(`Error was occurred while deleting file ${fileName}.`)
    //             );
    //         });
    //
    // }

    // updateAttachment(attachment, assigned) {
    //     let fileName = assigned ? attachment.filename : attachment.name;
    //
    //     this.attachmentService.update(attachment.id, {filename: fileName, description: attachment.description})
    //         .then((response) => {
    //             this.$mdToast.show(
    //                 this.$mdToast.simple().textContent(`File ${fileName} successfully updated.`)
    //             );
    //
    //         })
    //         .catch((error) => {
    //             this.$mdToast.show(
    //                 this.$mdToast.simple().textContent(`Error was occurred while updating attachment.`)
    //             );
    //         });
    // }

    cancel() {
        if (this.$stateParams.id) {
            this.$state.go('issues.info', {id: this.$stateParams.id});
        } else {
            const projectId = this.projectsService.getCurrentId();
            this.$state.go((projectId ? 'issues-inner' : 'issues') + '.list', {project_id: projectId});
        }
    }

}