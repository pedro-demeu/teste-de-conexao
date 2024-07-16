const express = require("express");
const cors = require("cors");
const speedTest = require("speedtest-net");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

app.get("/teste-de-conexao", async (req, res) => {
  try {
    const response = await speedTest({ acceptLicense: true, acceptGdpr: true });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Speed test error:", error.message);
    return res.status(500).json({ error: "Failed to fetch speed test." });
  }
});
