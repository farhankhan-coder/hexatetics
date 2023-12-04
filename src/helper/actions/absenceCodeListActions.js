import axios from "axios";

export const getAbsenceCodeList = async (accessToken) => {
    //*Request data
    let requestedData = {
        "accessToken": accessToken
    }

    try {
        const response = await axios.post("/api/common/getAbsentcodeList", { requestedData });
        let getAbsentCodeList = response.data
        // if (getUserAppPermissionList.responseCode === API_STATUS.SUCCESS) {
        return getAbsentCodeList
        // } else {
        // }
    }
    catch (err) {
    }
}