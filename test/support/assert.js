/**
 * Date: 3/5/2018
 * Time: 9:10 PM
 * @license MIT (see project's LICENSE file)
 *
 * There is both runtime support and test support. We flag those that are safe for any runtime environment.
 * But most are intended for unit and integration testing
 */

const _=require("lodash");
const assert=require("assert");
const immutable=require("../../lib/mutation").immutable;
const type=require("../../lib/type");


// mixin the guys that we like
exports.doesNotThrow=assert.doesNotThrow;
exports.equal=assert.strictEqual;
exports.false=(condition, ...args)=>assert.ok(Boolean(condition)===false, ...args);
exports.ifError=assert.ifError;
exports.notDeepEqual=assert.notDeepEqual;
exports.notEqual=assert.strictEqual;
exports.notStrictEqual=assert.notStrictEqual;
exports.ok=assert.ok;
exports.strictEqual=assert.strictEqual;
exports.throws=assert.throws;
exports.true=(condition, ...args)=>assert.ok(Boolean(condition), ...args);


/**
 * We print out the expected as, in here at least, we frequently want to steal it.
 * @param {*} actual
 * @param {*} expected
 * @param {string} message
 * @param {boolean} scrub
 * @throws {Error}
 */
exports.deepEqual=function(actual, expected, {
	message=undefined,
	scrub=true
}={}) {
	try {
		if(scrub && _.isPlainObject(actual)) {
			actual=immutable.object.scrub(actual);
			expected=immutable.object.scrub(expected);
		}
		assert.deepStrictEqual(actual, expected, message);
	} catch(error) {
		if(_.isPlainObject(actual)) {
			actual=immutable.object.sort(actual);
			expected=immutable.object.sort(expected);
		}
		const actualJSON=JSON.stringify(actual, null, "\t"),
			expectedJSON=JSON.stringify(expected, null, "\t");
		throw new Error(`assert.deepEqual() failed: actual=\n${actualJSON}\nexpected=\n${expectedJSON}`);
	}
};

/**
 * macro for assert.ok(false, error)
 * @param {Error|string} error
 */
exports.fail=(error)=>{
	// note: we convert it to a string (if an error) so that the assert library doesn't just throw him
	exports.ok(false, error.toString());
};

/**
 * Asserts <param>value</param> is an error
 * @param {Error|Function|null} value
 * @throws {Error}
 */
exports.isError=function(value) {
	assert.strictEqual(type.name(value), "Error");
};

/**
 * Simply asserts false if called
 * @param {string|Error|Function} [message]
 * @throws {Error}
 */
exports.notCalled=function(message=undefined) {
	throw new Error(`assert.notCalled() was called${(message!==undefined) ? `. ${message}` : ""}`);
};


/**
 * Will assert (to log) that all objects passed as params remain unchanged.
 * @param {[Object]} objects
 * @returns {function():@throws} - call when you are done and want to make sure the object did not change
 * @throws {Error}
 */
exports.immutable=function(...objects) {
	const clones=_.map(objects, (object)=>[_.cloneDeep(object), object]);
	return function() {
		clones.forEach(function(pair) {
			if(!_.isEqual(pair[0], pair[1])) {
				const expected=JSON.stringify(pair[0], null, "\t"),
					actual=JSON.stringify(pair[1], null, "\t");
				throw new Error(`assert.immutable() failed:\nexpected=${expected}\nactual=${actual}`);
			}
		});
	};
};

/**
 * @param {string} full - the whole string
 * @param {string} partial - the part that should match the beginning
 */
exports.startsWith=function(full, partial) {
	if(_.startsWith(full, partial)===false) {
		assert.ok(false, `"${full}" does not start with "${partial}"`);
	}
};
