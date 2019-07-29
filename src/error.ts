/**
 * Date: 2/8/18
 * Time: 9:48 PM
 * @license MIT (see project's LICENSE file)
 *
 */

const _=require("lodash");
const http=require("./enum/http");

// note: be careful including relative dependencies in here as it has far reaches


/**
 * Custom Error type that supports some "smart" constructors. And some property annotation support
 * @typedef {Error} ColonyError
 */
class ColonyError extends Error {
	/**
	 * General purpose pig error that hold all of our secrets.  He is designed to stash information
	 * related to the error so that we capture and report relevant info.  You may specify a number
	 * of predefined params and include additional ones.  You must supply something that constitutes
	 * a "message".  This can come from "message", "error", "code" or "instance"...though instance
	 * probably does not make for a very good message.
	 * @param {string} details - details in addition to the principle error or message
	 * @param {Error} error - error that will be promoted to "message" or "details" if they are not specified.
	 * @param {Object|string} instance - instance of object in which the error occurred
	 * @param {string} message
	 * @param {string} method - calling method
	 * @param {number} statusCode - http code to associate with error. See <link>./enum/http.js</link> for enums
	 * @param {...*} properties - additional properties that you want captured and logged.
	 */
	constructor({
		details=undefined,
		error=undefined,
		instance=undefined,
		message=undefined,
		method=undefined,
		statusCode=undefined,
		...properties
	}) {
		const leftovers=Object.assign({}, arguments[0]),
			getMostImportant=function(preferredPropery) {
				let result;
				if(leftovers[preferredPropery]) {
					result=leftovers[preferredPropery];
					delete leftovers[preferredPropery];
				} else if(leftovers.error) {
					result=leftovers.error.message;
					delete leftovers.error;
				} else if(leftovers.statusCode) {
					result=`${http.statusText[leftovers.statusCode]} (${leftovers.statusCode})`;
					delete leftovers.statusCode;
				}
				return result;
			};
		super(message || getMostImportant("message"));
		if(error) {
			if(!_.isError(error)) {
				error=new Error(error);
			}
			// so that we can trace things to the true origin we steal his stack. There may be times at which we don't want to do this?
			this.stack=error.stack;
			// steal goodies that we want to inherit
			if(statusCode===undefined) {
				statusCode=error.statusCode;
			}
		}
		_.merge(this, _.omitBy({
			details: getMostImportant("details"),
			error,
			instance,
			method,
			statusCode,
			...properties
		}, _.isUndefined));
	}
}

module.exports.ColonyError=ColonyError;
