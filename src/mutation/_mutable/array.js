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
	if(!array) {
		array=[];
	}
	if(index===undefined) {
		array.push(element);
	} else {
		return array.splice(index, 0, element);
	}
	return array;
}

/**
 * @param {Array} array
 * @param {Array} elements
 * @param {Number} index
 * @returns {Array<*>}
 */
function concat(array, elements, index=undefined) {
	if(!array) {
		array=[];
	}
	if(index===undefined) {
		_.each(elements, function(element) {
			array.push(element);
		});
	} else {
		_.each(elements, function(element, offset) {
			return array.splice(index+offset, 0, element);
		});
	}
	return array;
}

/**
 * Performs omit on each element in the specified array
 * @param {Array<Object>|null}array
 * @param {string|Array<string>} path
 * @returns {Array<Object>}
 */
function omit(array, path) {
	_.forEach(array, (object, index)=>{
		array[index]=_.omit(object, path);
	});
	return array;
}

/**
 * Performs pick on each element in the specified array
 * @param {Array<Object>|null}array
 * @param {string|Array<string>} path
 * @returns {Array<Object>}
 */
function pick(array, path) {
	_.forEach(array, (object, index)=>{
		array[index]=_.pick(object, path);
	});
	return array;
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
	if(index> -1) {
		array.splice(index, 1);
	}
	return array;
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
		array[index]=newElement;
	} else {
		throw new Error("mutable.array.replace(): Could not find element to replace");
	}
	return array;
}

/**
 * @param {Array} array
 * @param {string} property
 * @param {function(v1:*, v2:*):number} comparer
 * @param {boolean} reverse
 */
function sort(array, property, {
	comparer=compare.any,
	reverse=false
}={}) {
	if(array) {
		array.sort((o1, o2)=>comparer(_.get(o1, property), _.get(o2, property)));
		if(reverse) {
			array.reverse();
		}
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
