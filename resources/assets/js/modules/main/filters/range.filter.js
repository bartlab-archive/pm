import FilterBase from "base/filter.base";

export default class RangeFilter extends FilterBase {

    $filter(input, total) {
        total = parseInt(total);

        for (let i = 0; i < total; i++) {
            input.push(i);
        }

        return input;
    }

}
