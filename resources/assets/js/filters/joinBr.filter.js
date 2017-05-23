import 'angular';

export default function joinBrFilter() {
    return (array) => {
        return angular.isArray(array) ? array.join('<br>') : '';
    };
}