const path = require("path");

const entries = {};
entries["bundle"] = "./index.js";

module.exports = {
	entry: entries,
	target: "web",
};
