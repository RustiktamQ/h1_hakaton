const axios = require("axios");
const getData = async() => {
    try{
        const response = await axios.get("https://books.toscrape.com/")
        console.log(response.data);
    }
    catch(e) {
        console.log(e);
    }
}

getData();