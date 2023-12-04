var axios = require("axios");
import commonHandler from '../api';

export default async function handler(req, res) {

    const { requestedData } = req.body;
    const { userId } = requestedData;

    commonHandler(req, res, "get", `employee/cognito/${userId}`);

}
