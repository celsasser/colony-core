/**
 * Date: 2019-07-10
 * Time: 22:15
 * @license MIT (see project's LICENSE file)
 *
 * @module colony-core/enum
 */

const http=require("./http");
const priority=require("./priority");
const severity=require("./severity");

/**
 * Determines whether the value is valid
 * @param {Object} enumObject
 * @param {string} value
 * @returns {boolean}
 */
function isValid(enumObject, value) {
	return Object.values(enumObject)
		.indexOf(value)> -1;
}

module.exports={
	isValid,
	http: {
		method: http.method,
		statusCode: http.statusCode,
		statusText: http.statusText
	},
	priority: priority.enum,
	severity: severity
};
