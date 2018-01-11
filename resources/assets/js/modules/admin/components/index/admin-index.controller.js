import ControllerBase from 'base/controller.base';

/**
 * @property {Object} $state
 */
export default class AdminIndexController extends ControllerBase {

    static get $inject() {
        return ['$state'];
    }

    $onInit() {
        this.list = [
            {name: 'Projects', url: 'admin.projects', icon: 'work'},
            {name: 'Users', url: 'users.list', icon: 'person'},
            {name: 'Groups', url: 'groups.index', icon: 'group'},
            {name: 'Roles and permissions', url: 'roles.index', icon: 'vpn_key'},
            {name: 'Trackers', url: 'trackers.index', icon: 'timelapse'},
            {name: 'Issue statuses', url: 'statuses.index', icon: 'done'},
            {name: 'Workflow', url: 'workflows.edit', icon: 'assignment_return'},
            {name: 'Custom fields', url: 'fields.index', icon: 'text_fields'},
            {name: 'Enumerations', url: 'enumerations.index', icon: 'list'},
            {name: 'Settings', url: 'settings.index', icon: 'settings'},
            {name: 'LDAP authentication', url: 'auth.index', icon: 'lock'},
            {name: 'Plugins', url: 'admin.plugins', icon: 'extension'},
            {name: 'Information', url: 'admin.info', icon: 'info'},
        ];
    }

    goto(url) {
        this.$state.go(url);
    }

}