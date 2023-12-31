var axios = require("axios");

export default async function handler(req, res) {

  const { requestData } = req.body;

  try {
    var config = {
      method: 'post',
      url: "http://3.14.164.218:8083/employee/auth",
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(requestData)
    };

    await axios(config)
      .then(function (returnResponse) {
        return res.status(200).json(returnResponse.data)
      })
      .catch(function (error) {
        if (error.response) {
          return res.status(error.response.status).json(error.response.data)
        }
        return res.status(400).json(error)
      });
   
  } catch (error) {
    console.error('eeeeeeeee', error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }

}