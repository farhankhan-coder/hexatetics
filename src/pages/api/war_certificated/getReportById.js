var axios = require("axios");
import commonHandler from '../api';

export default async function handler(req, res) {
    const { requestedData } = req.body;
    const { reportId } = requestedData;
    commonHandler(req, res, "get", `war/certificated/${reportId}`);
}
