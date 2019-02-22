import {schema} from 'normalizr';
import {awaitImport} from '../../../../app/helpers/import';

const {selectProjectsEntities} = awaitImport('modules/projects/store/reducers');
const {selectUsersEntities} = awaitImport('app/store/reducers/app.reducer');

const user = new schema.Entity('users');
const member = new schema.Entity('members', {
    user,
});

const project = new schema.Entity('projects', {
    members: [member],
}, {
    idAttribute: 'identifier',
});

const tracker = new schema.Entity('trackers');
const priority = new schema.Entity('priorities');
const status = new schema.Entity('statuses');

const definition = {
    author: user,
    assigned: user,
    watchers: [user],
    project,
    tracker,
    trackers: [tracker],
    priority,
    status,
};

if (!selectProjectsEntities) {
    delete definition.project;
}
if (!selectUsersEntities) {
    delete definition.author;
    delete definition.assigned;
    delete definition.watchers;
}

export default new schema.Entity('issues', definition);
