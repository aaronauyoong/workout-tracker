const router = require("express").Router();
const { Workout } = require("../models/workout.js");

function arraySumDuration(array) {
	let sum = 0;
	for (let index = 0; index < array.length; index++) {
		sum += array[index].duration;
	}
	return sum;
}

function arraySumDist(array) {
	let sum = 0;
	for (let index = 0; index < array.length; index++) {
		sum += array[index].distance;
	}
	return sum;
}

// get all workouts
router.get("/api/workouts", async (_, res) => {
	try {
		const allWorkouts = await Workout.find({})
			.sort({ name: 1 })
			.then((allWorkouts) => {
				const workouts = allWorkouts.map((workout) => {
					// calc the total duration for each workout
					const totalDuration = arraySumDuration(workout.exercises);
					const totalDistance = arraySumDist(workout.exercises);

					return {
						...workout.toObject(),
						totalDuration,
						totalDistance,
					};
				});

				res.json(workouts);
			});
	} catch (err) {
		res.status(400).json(err);
	}
});

// create a new workout
router.post("/api/workouts", async ({ body }, res) => {
	console.log(body);
	try {
		const addWorkout = await Workout.create(body).then((addWorkout) => {
			res.json(addWorkout);
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

// edit an existing workout by ID
router.put("/api/workouts/:id", async (req, res) => {
	try {
		const editWorkout = await Workout.findByIdAndUpdate(
			{ _id: req.params.id },
			{ exercises: req.body }
		).then((editWorkout) => {
			res.json(editWorkout);
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

// get workouts/range for the stats page - links to frontend function getWorkoutsInRange()
router.get("/api/workouts/range", async (_, res) => {
	try {
		const workoutStats = await Workout.find({}).then((workoutStats) => {
			res.json(workoutStats);
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;
