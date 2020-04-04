const fetch = require("node-fetch");

getGender = async (name) => {
    const rawResponse = await fetch(`https://api.genderize.io/?name=${name}`);
    const response = await rawResponse.json();
    return response.gender;
};

module.exports = {  getGender };