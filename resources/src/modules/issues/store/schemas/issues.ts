import {schema} from 'normalizr';

const user = new schema.Entity('users');
const tracker = new schema.Entity('trackers');
const status = new schema.Entity('statuses');

export default new schema.Entity('issues', {
    author: user,
    assigned: user,
    watchers: [user],
    trackers: [tracker],
    tracker: tracker,
    status: status,
});
