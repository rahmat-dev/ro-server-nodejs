const express = require("express");
const axios = require("axios").default;

const app = express();
const port = process.env.PORT || 3000;
const apiKey = "1e096071642f346a1881b4733ebc4cff";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const headers = {
  key: apiKey,
};

// Get All Provinces
app.get("/province", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.rajaongkir.com/starter/province",
      { headers }
    );
    res.json(response.data.rajaongkir);
  } catch (error) {
    console.error(error);
  }
});

// Get All Cities by ProvinceID
app.get("/city", async (req, res) => {
  const { province } = req.query;

  try {
    const response = await axios.get(
      "https://api.rajaongkir.com/starter/city",
      {
        headers,
        params: { province },
      }
    );
    res.json(response.data.rajaongkir);
  } catch (error) {
    console.error(error);
  }
});

// Calculate Delivery Cost
app.post("/cost", async (req, res) => {
  const { origin, destination, weight, courier } = req.body;
  const data = {
    origin,
    destination,
    weight,
    courier,
  };

  try {
    const response = await axios.post(
      "https://api.rajaongkir.com/starter/cost",
      data,
      { headers }
    );
    res.json(response.data.rajaongkir);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => console.log(`Running server on port ${port}`));
