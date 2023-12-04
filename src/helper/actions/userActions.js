import axios from "axios";

export const getUserPermissions = async (userId,accessToken) => {
    //*Request data
    let requestedData = {
        "accessToken": accessToken,
        "userId": userId
    }

    try {
        const response = await axios.post("/api/common/getuserPermissionList", { requestedData });
        let getUserAppPermissionList = response
        // if (getUserAppPermissionList.responseCode === API_STATUS.SUCCESS) {
        return getUserAppPermissionList
        // } else {
        // }
    }
    catch (err) {
        console.log("err----" + err)
        return err.response;
    }
}