export default function NoSpecialCharacter(value) {
    let reg = /^[^!-\/:-@\[-`{-~]+$/;
    if (reg.test(value) === false) {
        return false;
    }
    else {
        return true
    }
};