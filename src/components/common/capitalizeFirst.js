// export default function capitalizeFirst(value) {
//     if (value === value.toUpperCase()) {
//         return value
//     } else {
//         return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
//     }
// };

export default function capitalizeFirst(value) {
    if(value !== undefined && value !== null)
    {
       if (value === value.toUpperCase()) {
           return value
       } else {
           return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
       }
    }
}