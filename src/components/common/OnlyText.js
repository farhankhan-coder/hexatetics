export default function OnlyText(value) {
    let reg = /^[a-zA-Z ]*$/;
    if (reg.test(value) === false) {
        return false;
    }
    else {
        return true
    }
};