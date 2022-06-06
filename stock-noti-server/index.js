const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/api/auth");

//App Config
const app = express();
const port = 3001; //process.env.PORT || 3001

//Middleware
app.use(express.json());
app.use(cors());

//Database Connection

//Routes
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
