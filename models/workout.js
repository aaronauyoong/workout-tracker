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
            distance: {
                type: Number,
            },
            weight: {
                type: Number,
            },
            reps: {
                type: Number,
            },
            sets: {
                type: Number,
            }
		},
	],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = { Workout };
