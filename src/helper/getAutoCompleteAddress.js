const getCity = (addressArray) => {
    let city = '';
    for (let i = 0; i < addressArray.length; i++) {
        if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
            city = addressArray[i].long_name;
            return city;
        }
    }
};

const getState = (addressArray) => {
    let state = '';
    for (let i = 0; i < addressArray.length; i++) {
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                state = addressArray[i].long_name;
                return state;
            }
        }
    }
};

const getCountry = (addressArray) => {
    let country = '';
    for (let i = 0; i < addressArray.length; i++) {
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'country' === addressArray[i].types[0]) {
                country = addressArray[i].long_name;
                return country;
            }
        }
    }
};

const getArea = (addressArray) => {
    let area = '';
    let area2 = ""
    for (let i = 0; i < addressArray.length; i++) {
        if (addressArray[i].types[0]) {
            for (let j = 0; j < addressArray[i].types.length; j++) {

                // if ('sublocality_level_1' === addressArray[i].types[j] || 'sublocality' === addressArray[i].types[j] || 'political' === addressArray[i].types[j] ) {
                //     area = addressArray[i].long_name;
                //     console.log("sub-----")
                // }
                // if ('route' === addressArray[i].types[j]) {
                //     area2 = addressArray[i].long_name;
                //     console.log("route-----")
                // }
                if ('plus_code' === addressArray[i].types[j]) {
                    area2 = addressArray[i].long_name;
                    
                    console.log("route-----"+ area2)
                }

                // let finalString = area + " " + area2
                // console.log(finalString)
            }
        }
    }
};

const getZipCode = (addressArray) => {
    let zipCode = '';
    for (let i = 0; i < addressArray.length; i++) {
        if (addressArray[i].types[0]) {
            for (let j = 0; j < addressArray[i].types.length; j++) {
                if ('postal_code' === addressArray[i].types[j]) {
                    zipCode = addressArray[i].long_name;
                    return zipCode;
                }
            }
        }
    }
};

export { getCity, getState, getCountry, getArea, getZipCode}