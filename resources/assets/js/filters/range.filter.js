import angular from 'angular';

export default function rangeFilter() {
    return (input, total) => {
        total = parseInt(total);
        for (let i = 0; i < total; i++) {
            input.push(i);
        }
        return input;
    };
}