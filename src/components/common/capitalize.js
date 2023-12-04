export default function capitalize(value) {
    if (value === value.toUpperCase()) {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    } else {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
};