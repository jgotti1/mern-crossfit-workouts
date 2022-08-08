const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: false,
    },
    workoutType: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },

    results: {
      type: String,
      required: false,
    },
    rx: {
      type: String,
      required: false,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
