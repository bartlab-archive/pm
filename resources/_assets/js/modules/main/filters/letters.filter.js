import FilterBase from "base/filter.base";

export default class LettersFilter extends FilterBase {

    $filter(input, letters) {
        if (isNaN(letters)) {
            return input;
        }

        if (letters <= 0) {
            return '';
        }

        if (input) {
            return input.substring(0, letters);
        }
    }

}
