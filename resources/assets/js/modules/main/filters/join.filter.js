import angular from 'angular';
import FilterBase from "base/filter.base";

export default class JoinFilter extends FilterBase {

    $filter(input, glue = '<br>', empty) {
        return angular.isArray(input)
            ? input.filter((element) => !!element).join(glue)
            : angular.isString(input) ? input : empty;
    }

}