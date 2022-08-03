const express = require("express");
const workoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(express.json());

// cors to allow server to server communication without proxy
app.use(cors());

//Routes
app.use("/api/workouts", workoutRoutes);

//DB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //port listen
    app.listen(process.env.PORT, () => {
      console.log("connected to MongoDB listening on port number", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("ERROR....", error);
  });
