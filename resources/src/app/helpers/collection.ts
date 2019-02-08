export const findBy = (collection: Array<Object>, prop: string) => {
    return collection
        .filter((value) => value.hasOwnProperty(prop))
        .map((value) => value[prop])
        .reduce((acc, val) => acc.concat(val), []);
};
