console.log("Client side JavaScript File loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const forecast = document.querySelector("#forecast");
const locationAPI = document.querySelector("#location");
const errorMsg = document.createElement("p");

async function fetchWeatherForecast(address) {
  try {
    const response = await fetch(
      `http://localhost:3000/weather?address=${address}&country=AU`
    );
    const data = await response.json(); //return JS object
    const errExist = data.error ? data.error : false;
    errorMsg.textContent = "";
    if (errExist) throw new Error(errExist);
    forecast.textContent = "Forecast: " + data.forecast;
    locationAPI.textContent = "Location: " + data.location;
    errorMsg.textContent = "";
  } catch (error) {
    const textnote = document.createTextNode(error.message);
    forecast.textContent = "";
    locationAPI.textContent = "";
    errorMsg.appendChild(textnote);
    locationAPI.insertAdjacentElement("afterend", errorMsg);
  }
}

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  fetchWeatherForecast(search.value);
});
