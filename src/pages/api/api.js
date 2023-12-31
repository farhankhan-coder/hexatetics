var axios = require("axios");

export default async function handler(req, res, method, url) {

    const { requestedData } = req.body;
    const { accessToken} = requestedData;
    try {

        var config = {
            method: method,
            url: "http://3.14.164.218:8083/"+url, 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            data: JSON.stringify(requestedData)
            
        };

        await axios(config)
            .then(function (returnResponse) {
                return res.status(200).json(returnResponse.data)
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                      return res.status(401).json("Unauthorized access"); 
                    }
                    else if (error.response.status === 409) {
                        return res.status(409).json("Employee already exist."); 
                      }
                    return res.status(error.response.status).json(error.response.data);
                  }
                  return res.status(400).json({ error: "Bad request" }); 
            });

    } catch (error) {
        console.error('eeeeeeeee', error);
        res.status(500).json({ message: "An error occurred. Please try again later." });
    }
}
