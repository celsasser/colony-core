/**
 * Date: 3/5/2018
 * Time: 9:10 PM
 * @license MIT (see project's LICENSE file)
 */


const order=[
	"debug",
	"info",
	"warn",
	"error",
	"fatal"
];

/**
 * Should by in parity with <code>ColonySeverity</code>
 */
const severity={
	DEBUG: "debug",
	INFO: "info",
	WARN: "warn",
	ERROR: "error",
	FATAL: "fatal"
};

/**
 * Is the <param>severity</param> param greater than or equal to the <param>threshold</param> param
 * @param {ColonySeverity} value
 * @param {ColonySeverity} threshold
 * @returns {boolean}
 */
function test(value, threshold) {
	return order.indexOf(value)>=order.indexOf(threshold);
}

module.exports={
	enum: severity,
	order,
	test
};
