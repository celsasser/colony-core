/**
 * Date: 2019-07-09
 * Time: 21:45
 * @license MIT (see project's LICENSE file)
 */


const _=require("lodash");
const compare=require("../../compare");
const {
	searchCriteriaToIndex
}=require("../_array");

/**
 * @param {Array} array
 * @param {*} element
 * @param {Number} index
 * @returns {Array<*>}
 */
function add(array, element, index=undefined) {
	if(index===undefined) {
		return (array || []).concat(element);
	} else {
		return array.slice(0, index)
			.concat(element)
			.concat(array.slice(index));
	}
}

/**
 * @param {Array} array
 * @param {Array} elements
 * @param {Number} index
 * @returns {Array<*>}
 */
function concat(array, elements, index=undefined) {
	if(index===undefined) {
		return (array || []).concat(elements);
	} else {
		return array.slice(0, index)
			.concat(elements)
			.concat(array.slice(index));
	}
}

/**
 * Performs omit on each element in the specified array
 * @param {Array<Object>|null}array
 * @param {string|Array<string>} path
 * @returns {Array<Object>}
 */
function omit(array, path) {
	return (array || []).map(_.partialRight(_.omit, path));
}

/**
 * Performs pick on each element in the specified array
 * @param {Array<Object>|null}array
 * @param {string|Array<string>} path
 * @returns {Array<Object>}
 */
function pick(array, path) {
	return (array || []).map(_.partialRight(_.pick, path));
}

/**
 * @param {Array} array
 * @param {*} element
 * @param {Number} index
 * @param {Object|Function} predicate that will be used by lodash to find our man
 * @returns {Array<*>}
 */
function remove(array, {
	element=undefined,
	index=undefined,
	predicate=undefined
}) {
	index=searchCriteriaToIndex(array, {element, index, predicate});
	return (index> -1)
		? array.slice(0, index).concat(array.slice(index+1))
		: array;
}

/**
 * @param {Array} array
 * @param {*} newElement
 * @param {*} element - element to replace
 * @param {Number} index - element index to replace
 * @param {Object|Function} predicate that will be used by lodash to find our man
 * @returns {Array<*>}
 * @throws {Error} if existing element cannot be found
 */
function replace(array, newElement, {
	element=undefined,
	index=undefined,
	predicate=undefined
}) {
	index=searchCriteriaToIndex(array, {element, index, predicate});
	if(index> -1) {
		array=array.slice();
		array[index]=newElement;
	} else {
		throw new Error("immutable.array.replace(): Could not find element to replace");
	}
	return array;
}

/**
 * @param {Array} array
 * @param {string} property
 * @param {boolean} reverse
 * @param {function(v1:*, v2:*):number} comparer
 * @returns {Array<*>}
 */
function sort(array, property, {
	comparer=compare.any,
	reverse=false
}={}) {
	if(array) {
		array=array.slice();
		array.sort((o1, o2)=>comparer(_.get(o1, property), _.get(o2, property)));
		if(reverse) {
			array.reverse();
		}
		return array;
	}
}

module.exports={
	add,
	concat,
	omit,
	pick,
	remove,
	replace,
	sort
};
