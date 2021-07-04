const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
	day: {
		type: Date,
		default: Date.now,
	},
	exercises: [
		{
			type: {
				type: String,
				trim: true,
				required: "Please enter the type of exercise (e.g. upper body, core).",
			},
            name: {
                type: String,
                trim: true, 
                required: "Please enter the name of the exercise.",
            },
            duration: {
                type: Number,
                required: "Please enter the duration of this exercise."
            },
            weight: {
                type: Number,
                required: "Please enter the weight used for this exercise."
            },
            repetitions: {
                type: Number,
                required: "Please enter the total number of repetitions for this exercise."
            },
            sets: {
                type: Number,
                required: "Please enter the total number of sets for this exercise."
            }
		},
	],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = { Workout };
