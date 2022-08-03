const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// GET ALL WORKOUTS
const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

// GET  A SINGLE WORKOUT
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Workout" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "No Such Workout" });
  }
  res.status(200).json(workout);
};

// CREATE A NEW WORKOUT
const createWorkout = async (req, res) => {
  const { title, time, workoutType, details, results, rx } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!workoutType) {
    emptyFields.push("workoutType");
  }
  if (!details) {
    emptyFields.push("details");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all required fields", emptyFields });
  }

  //add to DB
  try {
    const workout = await Workout.create({ title, time, workoutType, details, results, rx });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
    res.json({ mssg: res.message });
  }
};

// DELETE A WORKOUT
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Workout" });
  }
  const workout = await Workout.findByIdAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "No Such Workout" });
  }
  res.status(200).json(workout);
};
// UPDATE A WORKOUT
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Workout" });
  }
  const workout = await Workout.findByIdAndUpdate({ _id: id }, { ...req.body });
  if (!workout) {
    return res.status(404).json({ error: "No Such Workout" });
  }
  res.status(200).json(workout);
};

module.exports = { createWorkout, getAllWorkouts, getWorkout, deleteWorkout, updateWorkout };
