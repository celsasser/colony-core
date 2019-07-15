/**
 * Date: 3/24/18
 * Time: 3:40 AM
 * @license MIT (see project's LICENSE file)
 *
 * @module colony-core/date
 */

const _=require("lodash");

/**
 * Offsets <param>data</param>
 * @param {Date} date
 * @param {number=0} days
 * @param {number=0} hours
 * @param {number=0} millis
 * @param {number=0} minutes
 * @param {number=0} seconds
 * @returns {Date}
 */
function add(date, {
	days=0,
	hours=0,
	millis=0,
	minutes=0,
	seconds=0
}) {
	const offset=millis
		+ seconds*1000
		+ minutes*1000*60
		+ hours*1000*60*60
		+ days*1000*60*60*24;
	return new Date(date.getTime()+offset);
}

/**
 * Safely compares dates
 * @param {Date} date1
 * @param {Date} date2
 * @return {boolean}
 */
function isEqual(date1, date2) {
	if(date1===date2) {
		return true;
	} else if(date1 && date2) {
		return date1.getTime()===date2.getTime();
	} else {
		return false;
	}
}


/**
 * Does all he can to convert a string into a date object
 * @param {string} text
 * @returns {Date|null}
 * @throws {Error}
 */
function fromString(text) {
	let result=null;
	if(_.isEmpty(text)===false) {
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
	add,
	isEqual,
	fromString,
	fromValue,
	toISOString
};
