var axios = require("axios");
import commonHandler from '../api';

export default async function handler(req, res) {

    const { requestedData } = req.body;
    const { processIstanceId } = requestedData;

    commonHandler(req, res, "get", `camunda/history/${processIstanceId}`);

}