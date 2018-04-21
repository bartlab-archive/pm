import FilterBase from "base/filter.base";

export default class Nl2pFilter extends FilterBase {

    $filter(text) {
        text = String(text).trim();
        return (text.length > 0 ? '<p>' + text.replace(/[\r\n]+/g, '</p><p>') + '</p>' : null);
    }

}
