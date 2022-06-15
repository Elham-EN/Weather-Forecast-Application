const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const app = express(); //Single express

/**
 * Setup handlebars engine and views location
 */
//Tell express which template engine we are using.
app.set("view engine", "hbs"); //set up handlebars
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

//Serving Up a Static Assets - Serving HTML, CSS, JS, Img
//Configue Express to serve up an entire directory of assets
//that could contain HTML, Images and more. Index.html (special
//file) get served up by default (root of our website). Static
//takes path to the folder we want to serve up. Express static
//call is going to find index.html that was sent by Get Request.
app.use(express.static(path.join(__dirname, "../public")));

//User make a GET request (when fire the url on the browser)
//Call this callback function when someone visit this route "/"
//req object containing the information about the incoming request
//to the express server and res object allow us to customize what
//we are going to send back to the client who sent the request.

app.get("", (req, res) => {
  //an object that contains all the variables the template should
  //have access to when rendering
  res.render("index", { title: "Weather", name: "Andrew" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Me", name: "Andrew Mead" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Andrew",
  });
});

app.get("/weather", async (req, res) => {
  if (!req.query.address) {
    return res.status(400).send({ error: "Must provide Address" });
  }
  if (!req.query.country) {
    return res.status(400).send({ error: "Must provide country" });
  }
  const { address, country } = req.query;
  try {
    const data = await geocode(address, country);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    return res.send({
      forecast: data.current.condition.text,
      location: data.location.name,
      address: address,
    });
  } catch (error) {
    return res.send({ error: "Unable to find the location" });
  }
});

//The 404 page will show when a user tries to visit a page that
//doesn’t exist. * match every routes that is not listed above
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andrew Mead",
    errorMessage: "Page not found.",
  });
});

//Listen to the express server
//port will listen to env PORT if it exist, otherwise listen to port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is up on port 3000");
});
