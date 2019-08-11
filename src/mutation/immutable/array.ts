/**
 * Date: 2019-07-09
 * Time: 21:45
 * @license MIT (see project's LICENSE file)
 */


import * as _ from "lodash";
import {
	searchCriteriaToIndex
} from "../utils";
import * as compare from "../../compare";


export function add<T>(array: T[], element: T, index?: number): T[] {
	if(index === undefined) {
		return (array || []).concat(element);
	} else {
		return array.slice(0, index)
			.concat(element)
			.concat(array.slice(index));
	}
}

export function concat<T>(array: T[], elements: T[], index?: number): T[] {
	if(index === undefined) {
		return (array || []).concat(elements);
	} else {
		return array.slice(0, index)
			.concat(elements)
			.concat(array.slice(index));
	}
}

/**
 * Performs omit on each element in the specified array
 */
export function omit(array: {[key: string]: any}[], path: string): {[key: string]: any}[] {
	return (array || []).map(_.partialRight(_.omit, path));
}

/**
 * Performs pick on each element in the specified array
 */
export function pick(array: {[key: string]: any}[], path: string): {[key: string]: any}[] {
	return (array || []).map(_.partialRight(_.pick, path));
}

/**
 * @param array - array from which to remove element
 * @param element - optional element to remove
 * @param index - optional case where index is known
 * @param predicate - that will be used by lodash to find our man
 */
export function remove<T>(array: T[], {
	element = undefined,
	index = undefined,
	predicate = undefined
}: {
	element?: T,
	index?: number,
	predicate?: _.ListIterateeCustom<T, boolean>
}): T[] {
	index = searchCriteriaToIndex(array, {element, index, predicate});
	return (index > -1)
		? array.slice(0, index).concat(array.slice(index + 1))
		: array;
}

/**
 * @param array - array from which to remove element
 * @param newElement - element to replace found searched for element
 * @param element - optional element to remove
 * @param index - optional case where index is known
 * @param predicate - that will be used by lodash to find our man
 * @throws {Error} if existing element cannot be found
 */
export function replace<T>(array: T[], newElement: T, {
	element = undefined,
	index = undefined,
	predicate = undefined
}: {
	element?: T,
	index?: number,
	predicate?: _.ListIterateeCustom<T, boolean>
}): T[] {
	index = searchCriteriaToIndex(array, {element, index, predicate});
	if(index > -1) {
		array = array.slice();
		array[index] = newElement;
	} else {
		throw new Error("immutable.array.replace(): Could not find element to replace");
	}
	return array;
}

/**
 * sorts array of objects by property key
 */
export function sort(array: {[key: string]: any}[], property: string, {
	comparer = compare.any,
	reverse = false
} = {}): {[key: string]: any}[]|undefined {
	if(array) {
		array = array.slice();
		array.sort((o1, o2) => comparer(_.get(o1, property), _.get(o2, property)));
		if(reverse) {
			array.reverse();
		}
	}
	return array;
}
