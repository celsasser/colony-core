/**
 * Date: 6/3/18
 * Time: 11:39 PM
 * @license MIT (see project's LICENSE file)
 *
 * @module colony-core/template
 */

const _=require("lodash");
const {ColonyError}=require("./error");

const storage={
	cache: {}
};

/**
 * Does substitution of variables in template string. Encoding of variables should be as follows: {{variable}}
 * @param {string} template
 * @param {Object} variables - set of key/values
 * @param {RegExp} interpolate - regex pattern for finding substitution variables
 * @returns {string}
 */
exports.render=function(template, variables, {
	interpolate=/{{\s*(\S+?)\s*}}/g
}={}) {
	if(!storage.cache.hasOwnProperty(template)) {
		storage.cache[template]=_.template(template, {interpolate});
	}
	try {
		return storage.cache[template](variables);
	} catch(error) {
		throw new ColonyError({
			error,
			details: `function=${storage.cache[template].toString()}\nvariables=${JSON.stringify(variables)}`,
			message: `attempt to render template='${template}' failed`
		});
	}
};
