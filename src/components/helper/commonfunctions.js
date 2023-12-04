function ConvertResponseForSelect(responses, defaultArray = []) {
    var myArray = [];
    if (!Array.isArray(defaultArray)) { myArray.push(defaultArray); }
    var objectArray = Object.entries(responses);
    objectArray.forEach(([key, value]) => {
        myArray.push({ name: value.name, code: value.id });
    })
    return myArray;
};

function ConvertResponseForEmployeeSelect(responses, defaultArray = []) {
    var myArray = [];
    if (!Array.isArray(defaultArray)) { myArray.push(defaultArray); }
    var objectArray = Object.entries(responses);
    objectArray.forEach(([key, value]) => {
        myArray.push({ name: value.employee_name + " (" + value.employee_code + ")" , code: value.id, schoolId: value.school_id });
    })
    return myArray;
};

function ConvertResponseForEmployee(responses, defaultArray = []) {
    var myArray = [];
    if (!Array.isArray(defaultArray)) { myArray.push(defaultArray); }
    var objectArray = Object.entries(responses);
    objectArray.forEach(([key, value]) => {
        myArray.push({ name: value.employee_name + " (" + value.employee_code + ")" , code: value.id });
    })
    return myArray;
};

function ConvertEnumToArray(responses, defaultArray = []) {
    var myArray = [];
    if (!Array.isArray(defaultArray)) { myArray.push(defaultArray); }
    var objectArray = Object.entries(responses);
    objectArray.forEach(([key]) => {
        myArray.push({ label: (key.toLowerCase()), value: key });
    })
    return myArray;

};





function GetSingleValueFromResponse(responses, keyName) {
    var returnValue = ''
    var myObject = Object.entries(responses);
    myObject.forEach(([key, value]) => {
        if (keyName === key) {
            returnValue = value;
            return true;
        }
    })
    return returnValue;

}

function GetValueFromArray(myArray, keyName) {
    for (var key in myArray) {
        if (myArray[key]['Name'] === keyName) {
            return myArray[key]['Value'];
        }
    }
}


function ObjectLength(object) {
    var length = 0;
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            ++length;
        }
    }
    return length;
};

//remove duplicate item from array
function checkDuplicates(currentArray) {
    return currentArray.filter((item,
        index) => currentArray.indexOf(item) === index && item !== "");
};

//*Get response from key
const getResponseFromKey = async (currentArray, KeyArray, employeeId, employeePayRate) => {

    let finalArray = []
    for (var i = 0; i < KeyArray.length; i++) {

        let getCurrentResponseFromKey = currentArray.filter((item) => item.employeeName === KeyArray[i])
        let getTotalHours = getCurrentResponseFromKey.map((item) => item.totalHourAndMinutesDisplay)
        let employeeTotalHours = getTotalHours.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        let data = {
            "employeeName": KeyArray[i],
            "employeeId": employeeId,
            "employeeResponse": getCurrentResponseFromKey,
            // "employeeType": employeeType,
            "employeeTotalHours": employeeTotalHours,
            "employeePayRate": employeePayRate,
            "employeeIndex": ""
        }
        finalArray.push(data)

        if (i === KeyArray.length - 1) {
            return finalArray
        }
    }
};


const getResponseFromKeyCertifiedAdmin = async (currentArray, KeyArray, employeeId, employeeType) => {

    let finalArray = []
    for (var i = 0; i < KeyArray.length; i++) {

        let getCurrentResponseFromKey = currentArray.filter((item) => item.employeeName === KeyArray[i])

        let data = {
            "employeeName": KeyArray[i],
            "employeeId": employeeId,
            "employeeResponse": getCurrentResponseFromKey,
            "employeeType": employeeType,
        }
        finalArray.push(data)

        if (i === KeyArray.length - 1) {
            return finalArray
        }
    }
};


function ObjectToArray(object) {
    let data = [];
    for (const [key, value] of Object.entries(object)) {
        data[key] = value;
    }
    return data;
}
function validateFileExtension(file_field, allowedExtensions) {
    let flag = false;
    let extension = file_field.substr(file_field.lastIndexOf('.') + 1).toLowerCase();
    if (allowedExtensions.indexOf(extension) === -1) {
        flag = true;
    }
    return flag;
}

function ConvertResponseForSelectWithRefCode(responses, defaultArray = []) {
    var myArray = [];
    if (!Array.isArray(defaultArray)) { myArray.push(defaultArray); }
    var objectArray = Object.entries(responses);
    objectArray.forEach(async ([key, value]) => {
        myArray.push({ name: value.name + " (" + value.code + ")", code: value.id });
    })
    return myArray;
};


function ConvertResponseForSelectWithRefCodedropdown(responses, defaultArray = []) {
    var myArray = [];
    if (!Array.isArray(defaultArray)) { myArray.push(defaultArray); }
    var objectArray = Object.entries(responses);
    objectArray.forEach(async ([key, value]) => {
        myArray.push({ name: value.name, code: value.id });
    })
    return myArray;
};

function ConvertResponseOfNameCodeForSelect(responses, defaultArray = []) {
    var myArray = [];
    if (!Array.isArray(defaultArray)) { myArray.push(defaultArray); }
    var objectArray = Object.entries(responses);
    objectArray.forEach(async ([key, value]) => {
        myArray.push({ label: value.name, value: value.code });
    })
    return myArray;
};

export function formatDateToDdMmYyyy(inputDate) {
    const date = new Date(inputDate);
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };
  








export { ConvertResponseForSelect, getResponseFromKeyCertifiedAdmin, ConvertEnumToArray, GetValueFromArray, GetSingleValueFromResponse, ObjectLength, ObjectToArray, validateFileExtension, checkDuplicates, getResponseFromKey, ConvertResponseForSelectWithRefCode, ConvertResponseForSelectWithRefCodedropdown, ConvertResponseForEmployeeSelect, ConvertResponseOfNameCodeForSelect,ConvertResponseForEmployee };