export const awaitImport = (path: string, empty = {}) => {
    try {
        return require(`../../${path}`);
    } catch (e) {
        // console.log(e);
        return empty;
    }
};

export const dummyFn = () => undefined;
