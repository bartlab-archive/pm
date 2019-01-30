export const propFromCollection = (routes: Array<Object>, prop: string) => {
    return routes
        .filter((value) => value.hasOwnProperty(prop))
        .map((value) => value[prop])
        .reduce((acc, val) => acc.concat(val), []);
};
