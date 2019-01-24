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
