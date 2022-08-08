const express = require("express");
const { createWorkout, getAllWorkouts, getWorkout, deleteWorkout, updateWorkout } = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

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
