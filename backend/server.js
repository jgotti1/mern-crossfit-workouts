const express = require("express");
const workoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


app.use(express.json());

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
