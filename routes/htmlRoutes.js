const path = require("path");

module.exports = (app) => {
	app.get("/exercise", (req, res) => {
        console.log("getting exercise path")
		res.sendFile(path.join(__dirname, "../public/exercise.html"));
	});

	app.get("/stats", (req, res) => {
        console.log("getting stats path")
		res.sendFile(path.join(__dirname, "../public/stats.html"));
	});
};
