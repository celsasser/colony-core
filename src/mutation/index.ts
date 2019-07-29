/**
 * Date: 3/9/18
 * Time: 8:23 PM
 * @license MIT (see project's LICENSE file)
 *
 * @module colony-core/mutation
 */


module.exports={
	immutable: {
		array: require("./_immutable/array"),
		object: require("./_immutable/object")
	},
	mutable: {
		array: require("./_mutable/array"),
		object: require("./_mutable/object")
	}
};
