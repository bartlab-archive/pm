import {schema} from 'normalizr';

const user = new schema.Entity('users');
const member = new schema.Entity('members', {
    user
});

const project = new schema.Entity('projects', {
    members: [member]
}, {
    idAttribute: 'identifier'
});

const tracker = new schema.Entity('trackers');
const priority = new schema.Entity('priorities');
const status = new schema.Entity('statuses');

export default new schema.Entity('issues', {
    author: user,
    assigned: user,
    watchers: [user],
    project,
    tracker: tracker,
    trackers: [tracker],
    priority,
    status
});
