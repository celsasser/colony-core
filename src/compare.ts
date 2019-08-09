/**
 * Date: 7/9/2019
 * Time: 9:10 PM
 * @license MIT (see project's LICENSE file)
 *
 */

import * as _ from "lodash";

/**
 * Compares any object types with handling for undefined objects.
 */
export function any(value1: any, value2: any, {
	ignoreCase = false
} = {}): -1|0|1 {
	if(value1 === value2) {
		return 0;
	} else if(value1 == null) {
		return 1;
	} else if(value2 == null) {
		return -1;
	} else if(_.isString(value1) && _.isString(value2)) {
		return string(value1, value2, {ignoreCase});
	}
	// @ts-ignore
	return _.clamp(value1 - value2, -1, 1);
}

/**
 * Compares two strings
 */
export function string(s1: string, s2: string, {
	ignoreCase = true
} = {}): -1|0|1 {
	if(s1 === s2) {
		return 0;
	} else if(s1 == null) {
		return 1;
	} else if(s2 == null) {
		return -1;
	} else {
		if(ignoreCase) {
			s1 = s1.toLowerCase();
			s2 = s2.toLowerCase();
		}
		// @ts-ignore
		return _.clamp(s1.localeCompare(s2), -1, 1);
	}
}
