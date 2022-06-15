const axios = require("axios").default;

const forecast = async ({ latitude, longitude }) => {
  const dataURL =
    "http://api.weatherapi.com/v1/current.json?" +
    "key=ef8c058918c74c7f885104717221406" +
    `&q=${latitude},${longitude}`;
  try {
    const response = await axios.get(dataURL);
    const resError = response.data.error ? true : false;
    if (resError) return "(HTTP) 400 Bad Request (client error)";
    return response.data;
  } catch (error) {
    throw new Error("Unable to connect to weather service!");
  }
};

module.exports = forecast;
