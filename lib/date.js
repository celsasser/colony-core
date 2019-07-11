/**
 * Date: 3/24/18
 * Time: 3:40 AM
 * @license MIT (see project's LICENSE file)
 *
 * @module colony-core/date
 */

const _=require("lodash");


/**
 * @param {Date} date
 * @param {Number} millis
 * @returns {Date}
 */
function addMillis(date, millis) {
	return new Date(date.getTime()+millis);
}

/**
 * @param {Date} date
 * @param {Number} seconds
 * @returns {Date}
 */
function addSeconds(date, seconds) {
	return new Date(date.getTime()+seconds*1000);
}

/**
 * @param {Date} date
 * @param {Number} minutes
 * @returns {Date}
 */
function addMinutes(date, minutes) {
	return new Date(date.getTime()+minutes*60*1000);
}

/**
 * @param {Date} date
 * @param {Number} hours
 * @returns {Date}
 */
function addHours(date, hours) {
	return new Date(date.getTime()+hours*60*60*1000);
}

/**
 * @param {Date} date
 * @param {Number} days
 * @returns {Date}
 */
function addDays(date, days) {
	return new Date(date.getTime()+days*24*60*60*1000);
}

/**
 * @param {Date} date1
 * @param {Date} date2
 * @return {boolean}
 */
function isEqual(date1, date2) {
	return date1.getTime()===date2.getTime();
}


/**
 * Does all he can to convert a string into a date object
 * @param {string} text
 * @returns {Date|null}
 * @throws {Error}
 */
function fromString(text) {
	let result=null;
	if(!_.isEmpty(text)) {
		result=Date.parse(text);
		if(isNaN(result)===false) {
			result=new Date(result);
		} else {
			throw new Error(`invalid date ${text}`);
		}
	}
	return result;
}

/**
 * Looks for the various known flavors of a date: Date, String, Number (assumes epoch)
 * @param {Date|Number|String} value
 * @returns {Date|null}
 * @throws {Error}
 */
function fromValue(value) {
	if(value==null) {
		return null;
	} else if(_.isDate(value)) {
		return value;
	} else if(_.isString(value)) {
		return fromString(value);
	} else if(_.isNumber(value)) {
		return new Date(value);
	}
	throw new Error(`unknown date value ${value}`);
}


/**
 * Allows support for older encodings without millis
 * @param {Date} date
 * @param {boolean} millis true to include them or false or undefined to eliminate them
 * @returns {string}
 */
function toISOString(date, millis=true) {
	const result=date.toISOString();
	return (millis)
		? result
		: result.replace(/\.\d+Z$/, "Z");
}

module.exports={
	addMillis,
	addSeconds,
	addMinutes,
	addHours,
	addDays,
	isEqual,
	fromString,
	fromValue,
	toISOString
};
