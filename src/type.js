/**
 * Date: 3/5/2018
 * Time: 9:10 PM
 *
 * @module colony-core/type
 */

/**
 * Gets the object name if possible. If not then the type.
 * @param {*} object
 * @returns {string}
 */
function name(object) {
	return (object==null)
		? String(object)
		: object.constructor.name;
}

module.exports={
	name
};

