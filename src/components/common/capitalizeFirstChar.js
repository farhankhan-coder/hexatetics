export default function capitalizeFirstChar(value) {
    if (value !== undefined && value !== null) {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
}