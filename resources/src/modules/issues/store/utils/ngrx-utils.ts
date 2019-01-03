// export const compare = (objA, objB) => {
//     let aProps = Object.getOwnPropertyNames(objA);
//     let bProps = Object.getOwnPropertyNames(objB);
//
//     if (aProps.length != bProps.length) {
//         return false;
//     }
//     for (let i = 0; i < aProps.length; i++) {
//         const propName = aProps[i];
//         if (objA[propName] !== objB[propName]) {
//             return false;
//         }
//     }
//     return true;
// };

export const updateStateEntities = (state, entities) => {
    return Object.keys(entities).reduce((acc, id) => {
        if (!acc[id]) {
            acc[id] = entities[id];
        }
        acc[id] = {
            ...acc[id],
            ...entities[id],
        };

        return acc;
    }, {...state});
};
