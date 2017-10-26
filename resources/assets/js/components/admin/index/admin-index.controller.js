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
            {name: 'Users', url: 'users', icon: 'person'},
            {name: 'Groups', url: 'groups', icon: 'group'},
            {name: 'Roles and permissions', url: 'roles', icon: 'vpn_key'},
            {name: 'Trackers', url: 'trackers', icon: 'timelapse'},
            {name: 'Issue statuses', url: 'issue_statuses', icon: 'done'},
            {name: 'Workflow', url: 'workflows.edit', icon: 'assignment_return'},
            {name: 'Custom fields', url: 'custom_fields', icon: 'text_fields'},
            {name: 'Enumerations', url: 'enumerations', icon: 'list'},
            {name: 'Settings', url: 'settings', icon: 'settings'},
            {name: 'LDAP authentication', url: 'auth_sources', icon: 'lock'},
            {name: 'Plugins', url: 'admin.plugins', icon: 'extension'},
            {name: 'Information', url: 'admin.info', icon: 'info'},
        ];
    }

    goto(url) {
        this.$state.go(url);
    }

}