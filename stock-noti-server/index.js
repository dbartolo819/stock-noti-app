const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const authRoutes = require("./routes/api/auth");

//App Config
const app = express();
const port = process.env.PORT || 3001

//Middleware
app.use(express.json());
app.use(cors());

//Database Connection
const stockNotiDB = process.env.MONGODB_URI;
mongoose.connect(stockNotiDB)

//Routes
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
