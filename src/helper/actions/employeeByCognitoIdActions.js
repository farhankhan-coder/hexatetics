import axios from "axios";

export const employeeByCognitoIdActions = async (userId,accessToken) => {
    //*Request data
    let requestedData = {
        "accessToken": accessToken,
        "userId": userId
    }
    try {
        const response = await axios.post("/api/common/getEmployeeByCognitoId", { requestedData });
        let getEmployeeByIdDetails = response.data
        // if (getUserAppPermissionList.responseCode === API_STATUS.SUCCESS) {
        return getEmployeeByIdDetails
        // } else {
        // }
    }
    catch (err) {
    }
}