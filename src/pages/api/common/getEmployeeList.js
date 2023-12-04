var axios = require("axios");
import commonHandler from '../api';

export default async function handler(req, res) {
    commonHandler(req, res, "get", `employee`);
}
