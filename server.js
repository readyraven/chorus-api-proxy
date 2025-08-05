const express = require("express");
const axios = require("axios");
const app = express();
require("dotenv").config();

app.get("/", (_req, res) => res.send("Chorus Proxy Server is Running"));

app.get("/chorus-calls", async (req, res) => {
  try {
    const response = await axios.get("https://api.chorus.ai/v1/calls", {
      headers: { Authorization: process.env.CHORUS_API_KEY },
      params: { from_date: req.query.from_date || new Date().toISOString().slice(0, 10) }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port " + port));
