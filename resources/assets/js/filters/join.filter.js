import angular from 'angular';

export default function joinFilter() {
    return (input, glue = '<br>', empty) => {
        return angular.isArray(input)
            ? input.filter((element)=> !!element ).join(glue)
            : angular.isString(input) ? input : empty;
    };
}