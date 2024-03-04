require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");

// ! initialising body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static")));

app.get("/", (request, response) => {
  response.render("home");
});

app.get("/show/:param", (request, response) => {
  const url_ = process.env.url + `anime/${request.params.param}`;
  response.render("specific", { url: url_ });
});

app.get("/download/:param", (request, response) => {
  const url_ = process.env.url + `download/${request.params.param}`;
  response.render("download", { url: url_ });
});

const transform = (initialName) => {
  return initialName.toLowerCase().split(" ").join("-");
};

app.post("/", async (request, response) => {
  const name = transform(request.body.anime);
  const suffix = `search/${name}`;
  const edited = process.env.url + suffix;

  const query = await fetch(edited)
    .then((response) => {
      return response.json();
    })
    .then((data) => data);

  response.render("anime", { data: query, og_query: request.body.anime });
});

app.listen(port, () => {
  console.log(`running on ${port}`);
});
