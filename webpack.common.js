const path = require("path");

const entries = {};
entries["bundle"] = "./index.js";

module.exports = {
	entry: entries,
	resolve: {
		alias: {
			"@src": path.resolve(__dirname + "/src"),
			"@test": path.resolve(__dirname + "/test"),
			"@modules": path.resolve(__dirname + "/node_modules"),
		},
	},
	target: "web",
};
