export default function OnlyNumbers(value) {
    let reg = /^[0-9\b]+$/;
    if (reg.test(value) === false) {
        return false;
    }
    else {
        return true
    }
};