export default function lettersFilter() {
    return (input, letters) => {
        if (isNaN(letters)) return input;
        if (letters <= 0) return '';
        if (input) {
            return input.substring(0, letters);
        }
    };
}