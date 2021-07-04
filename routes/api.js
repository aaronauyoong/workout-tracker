const router = require("express").Router();
const { Workout } = require("../models/workout.js");

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
router.post("/api/workouts", ({ body }, res) => {
	Workout.create(body)
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

// edit an existing workout by ID
router.put("/api/workouts/:id", (req, res) => {
	Workout.findByIdAndUpdate({ _id: req.params.id }, { exercises: req.body })
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

// get workouts/range for the stats page - links to frontend function getWorkoutsInRange() 
router.get("/api/workouts/range", ({}, res) => {
	Workout.find({})
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

module.exports = router;
