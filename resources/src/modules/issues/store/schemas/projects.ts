import {schema} from 'normalizr';

const user = new schema.Entity('users');
const member = new schema.Entity('members', {
    user,
});

export default new schema.Entity('projects', {
    members: [member],
}, {
    idAttribute: 'identifier',
});
