/**
 * Date: 7/9/2019
 * Time: 9:10 PM
 * @license MIT (see project's LICENSE file)
 *
 * @module colony-core/compare
 */

const _=require("lodash");

/**
 * Compares any object types with handling for undefined objects.
 * @param {*} value1
 * @param {*} value2
 * @param {boolean} ignoreCase - only applies to strings
 * @returns {number}
 */
function any(value1, value2, {
	ignoreCase=false
}={}) {
	if(value1===value2) {
		return 0;
	} else if(value1==null) {
		return 1;
	} else if(value2==null) {
		return -1;
	} else if(_.isString(value1) && _.isString(value2)) {
		return string(value1, value2, {ignoreCase});
	} else if(_.isDate(value1) && _.isDate(value2)) {
		return _.clamp(value1-value2, -1, 1);
	}
	return value1-value2;
}

/**
 * Compares two strings
 * @param {string} s1
 * @param {string} s2
 * @param {boolean} ignoreCase
 * @returns {number}
 */
function string(s1, s2, {
	ignoreCase=true
}={}) {
	if(s1!=null) {
		if(s2!=null) {
			if(ignoreCase) {
				s1=s1.toLowerCase();
				s2=s2.toLowerCase();
			}
			return _.clamp(s1.localeCompare(s2), -1, 1);
		} else {
			return -1;
		}
	} else if(s2) {
		return 1;
	}
	return 0;
}

module.exports={
	any,
	string
};
