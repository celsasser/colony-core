/**
 * Date: 3/9/18
 * Time: 8:23 PM
 * @license MIT (see project's LICENSE file)
 *
 * @module colony-core/mutation
 */


module.exports={
	immutable: {
		array: require("./immutable/array"),
		object: require("./immutable/object")
	},
	mutable: {
		array: require("./mutable/array"),
		object: require("./mutable/object")
	}
};
