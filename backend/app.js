const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const cookeiParser = require("cookie-parser");

require("dotenv").config();
const app = express();

///////route import //////
const authRoutes = require("./routes/auth");

//////////Database connection///////////////
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((e) => console.log(e));
////////////////////////////////////////////////

/////middlware/////////////

app.use(express.json());
app.use(cors());
app.use(cookeiParser());

//////////////////////////

/////routes////////////
app.use("/api", authRoutes);

/////////////////////

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
