const router = require("express").Router();
const { Workout } = require("../models/workout.js");

function arraySum(array) {
	let result = 0;
	for (let index = 0; index < array.length; index++) {
		result += array[index];
	}
	return result;
}

// get all workouts
router.get("/api/workouts", (req, res) => {
	Workout.find({})
		.sort({ name: 1 })
		.then((dbWorkouts) => {
			const workouts = dbWorkouts.map((workout) => {
				// calc the total duration for each workout
				const durations = workout.exercises.map(
					(exercise) => exercise.duration
				);

				const totalDuration = arraySum(durations);

				return {
					...workout.toObject(),
					totalDuration,
				};
			});

			res.json(workouts);
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
