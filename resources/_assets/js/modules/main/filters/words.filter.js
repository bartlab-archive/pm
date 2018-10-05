import FilterBase from "base/filter.base";

export default class WordsFilter extends FilterBase {

    $filter(input, words) {
        if (isNaN(words)) {
            return input;
        }

        if (words <= 0) {
            return '';
        }

        if (input) {
            let inputWords = input.split(' ');
            if (inputWords.length > words) {
                input = inputWords.slice(0, words).join(' ') + '…';
            }
        }

        return input;
    }

}
