const webpackconf = require("./webpack.dev-server.js")
const { merge } = require("webpack-merge");
const common = require("./karma.common.js");
const puppeteer = require("puppeteer");
const path = require('path');
process.env.CHROME_BIN = puppeteer.executablePath();

module.exports = (config) => {
	config.set(merge(common, {
		webpack : merge(webpackconf, {
			output: {
				path: path.resolve(__dirname, "runtime"),
			},
		}),
		logLevel : config.LOG_INFO,
		browsers : [/*"ChromeHeadless",*/ "Chrome" /*,  "Firefox", "PhantomJS","Safari", "ChromeHeadless"*/ ],
		autoWatch : true,
		singleRun : false,
		concurrency : Infinity
	}))
}
