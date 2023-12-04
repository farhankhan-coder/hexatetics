// Common util functions
import moment from "moment/moment";

export const adjustUTCToUserTimezone = (timeStamp) => {
    const userTimeZoneOffsetMinutes = new Date().getTimezoneOffset();
    return timeStamp + userTimeZoneOffsetMinutes * 60 * 1000;
}

export const formatTimeStamp = (timestamp) => {
    if (timestamp) {
        return moment(timestamp).format("YYYY-MM-DD HH:mm");
    }
    return '';
}