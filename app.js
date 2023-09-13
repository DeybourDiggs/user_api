const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./routes/User");
const PORT = process.env.PORT || 5050;

const db = process.env.MONGO_URI;

mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
