const express = require("express");
const { createWorkout, getAllWorkouts, getWorkout, deleteWorkout, updateWorkout } = require("../controllers/workoutCntroller");
const router = express.Router();

//Get all workouts
router.get("/", getAllWorkouts);
//Get singleworkouts
router.get("/:id", getWorkout);
//Post new workout
router.post("/", createWorkout);

//Delete  workout
router.delete("/:id", deleteWorkout);

//Update workout
router.patch("/:id", updateWorkout);

module.exports = router;
