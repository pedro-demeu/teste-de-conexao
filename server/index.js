const express = require("express");
const cors = require("cors");
const speedTest = require("speedtest-net");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("Listening on port 3000!");
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
