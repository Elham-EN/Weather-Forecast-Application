const axios = require("axios").default;
const forecast = require("./forecast");

const geocode = async (address, country) => {
  const geoCodeURL =
    "http://api.positionstack.com/v1/forward" +
    "?access_key=f453d123832dd73332f97d51baf81de9" +
    `&query=${address}` +
    `&country=${country}`;
  try {
    const response = await axios.get(geoCodeURL);
    if (response.data.data.length === 0)
      throw new Error(`${address}, not found`);
    const latitude = response.data.data[0].latitude;
    const longitude = response.data.data[0].longitude;
    const weatherInfo = await forecast({ latitude, longitude });
    return weatherInfo;
  } catch (error) {
    const queryError = error.response.data.error.context.query
      ? error.response.data.error.context.query.type
      : null;
    if (queryError === "invalid_query") {
      throw new Error("The address must not be blank or wrong data");
    } else {
      throw new Error(error);
    }
  }
};

module.exports = geocode;
