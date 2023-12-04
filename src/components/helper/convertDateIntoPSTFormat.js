import React from 'react'
import moment from 'moment-timezone';

const handleDateSelect = (date) => {

    const pstDate = moment(date).tz('America/Los_Angeles').format('MM/DD/YYYY HH:mm ');
    return pstDate;
    // dec.tz('').format('ha z');
}

export default handleDateSelect