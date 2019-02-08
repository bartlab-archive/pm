import {schema} from 'normalizr';

const user = new schema.Entity('users');
const role = new schema.Entity('roles');
const member = new schema.Entity('members', {
    user,
    roles: [role],
});

export default new schema.Entity('projects', {
    members: [member],
}, {
    idAttribute: 'identifier',
});
