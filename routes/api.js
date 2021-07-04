const router = require("express").Router();
const { Workout } = require("../models");

// get all workouts
router.get("/api/workouts", (req, res) => {
	Workout.find({})
		.sort({ name: 1 })
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

// create a new workout
router.post("/api/workouts", (req, res) => {
	Workout.create(body)
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

// edit an existing workout
router.put();

module.exports = router;
