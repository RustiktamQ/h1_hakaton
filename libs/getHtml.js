const axios = require('axios');

module.exports = async(url) => {
    const response = await axios.get(url);
    return response.data;
}