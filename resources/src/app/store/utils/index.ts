/*
 Method that updates the state by entities
 */
export const updateStateEntities = (state, entities) => {
    return Object.keys(entities).reduce((acc, id) => {

        // add new entity in state
        if (!acc[id]) {
            acc[id] = entities[id];
        }

        // update entity in state
        acc[id] = {
            ...acc[id],
            ...entities[id],
        };

        return acc;
    }, {...state});
};

/*
    Method that picks up entities by "action-payload" and updates the state
 */
export const getStateEntities = (state, action, key) => {
    if (action.payload && action.payload.entities && action.payload.entities[key]) {
        return updateStateEntities(state, action.payload.entities[key]);
    }

    return state;
};

export const awaitImport = (path: string, empty = {}) => {
    try {
        return require(`../../../${path}`);
    } catch (e) {
        console.log(e);
        return empty;
    }
};

export const dummyFn = () => undefined;
