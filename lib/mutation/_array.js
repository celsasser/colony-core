/**
 * Date: 2019-07-09
 * Time: 21:54
 * @license MIT (see project's LICENSE file)
 */

const _=require("lodash");

/**
 * Find index with given criteria
 * @param {Array} array
 * @param {*} element
 * @param {Number} index
 * @param {Object|Function} predicate that will be used by lodash to find our man
 * @returns {Number}
 * @throws {Error}
 */
function searchCriteriaToIndex(array, {
	element=undefined,
	index=undefined,
	predicate=undefined
}) {
	if(element!==undefined) {
		index=array.indexOf(element);
	} else if(predicate!==undefined) {
		index=_.findIndex(array, predicate);
	} else if(index===undefined) {
		throw new Error("required index is missing");
	}
	return index;
}

module.exports={
	searchCriteriaToIndex
};
