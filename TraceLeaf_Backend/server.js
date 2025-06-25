require("dotenv").config();
const express = require("express");
const cors = require("cors");

const trackingRoutes = require("./routes/tracking");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/tracking", trackingRoutes);

app.listen(PORT, () => {
  console.log(`✅ TraceLeaf API en ligne sur http://localhost:${PORT}`);
});
