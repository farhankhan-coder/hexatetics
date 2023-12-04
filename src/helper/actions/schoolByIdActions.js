import axios from "axios";

export const getSchoolById = async (id,accessToken) => {
    //*Request data
    let requestedData = {
        "accessToken": accessToken,
        "schoolId": id
    }

    try {
        const response = await axios.post("/api/common/getSchoolById", { requestedData });
        let getEmployeeByIdDetails = response.data
        // if (getUserAppPermissionList.responseCode === API_STATUS.SUCCESS) {
        return getEmployeeByIdDetails
        // } else {
        // }
    }
    catch (err) {
    }
}