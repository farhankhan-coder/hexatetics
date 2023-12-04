import axios from "axios";

export const getTimeline = async (processIstanceId, accessToken) => {
    //*Request data
    let requestedData = {
        "accessToken": accessToken,
        "processIstanceId": processIstanceId
    }
    try {
        const response = await axios.post("/api/common/getReportTimeline", { requestedData });
        let timelineDetails = response.data
        return timelineDetails
    }
    catch (err) {
    }
}