/**
 * Date: 2019-07-09
 * Time: 21:45
 * @license MIT (see project's LICENSE file)
 */

const _=require("lodash");
const mutable=require("../_mutable/object");


/**
 * Clones an object or object path
 * @param {Object|null} object
 * @param {string} path - It minimized the amount of data that needs to be cloned
 * @param {boolean} deep
 * @returns {Object}
 */
function clone(object, {
	path=undefined,
	deep=false
}={}) {
	if(_.isEmpty(path)) {
		return (deep)
			? _.cloneDeep(object)
			: Object.assign({}, object);
	} else {
		let parts=path.split(".");
		object=_.clone(object);
		object[parts[0]]=clone(object[parts[0]], parts.slice(1).join(), deep);
		return object;
	}
}

/**
 * Deletes the object at the property path in <code>object</code>
 * @param {Object|Array|null} object
 * @param {string} path
 * @returns {Object|Array}
 */
function deletePath(object, path) {
	return mutable.delete(_.cloneDeep(object), path);
}

/**
 * A variation of lodash's set but only sets if the value is not set:
 * - if object is not set then it defaults to {}
 * - it returns the value at "path"
 * @param {Object|null} object
 * @param {string} path
 * @param {*} value
 * @returns {Object|string}
 */
function ensure(object, path, value) {
	return mutable.ensure(_.cloneDeep(object), path, value);
}

/**
 * Removes properties of objects with <param>removables</param>values. It does not remove <param>removables</param> from arrays
 * but it does recursively process array elements and should they be objects then it will scrub those objects.
 * Note: must be careful to make sure there are no recursive references inside your object.
 * @param {Object|null} object will only process object passing isObject test
 * @param {boolean} recursive whether to recurse into children properties
 * @param {*|[*]|Function} removables object or array of objects that qualify as or test for `remove`
 * @returns {Object} same object passed as <param>object</object>
 */
function scrub(object, {
	recursive=true,
	removables=[undefined]
}={}) {
	return mutable.scrub(_.cloneDeep(object), {
		recursive,
		removables
	});
}

/**
 * Recursively sorts object's properties
 * @param {Object|null|undefined} object
 * @returns {Object}
 */
function sort(object) {
	if(object!=null) {
		if(_.isPlainObject(object)) {
			return Object.keys(object)
				.sort()
				.reduce((result, key)=>{
					result[key]=sort(object[key]);
					return result;
				}, {});
		} else if(_.isArray(object)) {
			return object.map(sort);
		}
	}
	return object;
}

module.exports={
	clone,
	delete: deletePath,
	ensure,
	scrub,
	sort
};
