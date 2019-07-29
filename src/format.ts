/**
 * Date: 10/18/18
 * Time: 10:08 PM
 * @license MIT (see project's LICENSE file)
 *
 */

const diagnostics=require("./diagnostics");
const type=require("./type");

/**
 * Gets text suitable for different purposes. Caller may control the results with
 * <param>details</param>, <param>source</param> and <param>stack</param>
 * @param {Error|string} error
 * @param {string} details - whether to dig the details out of the error or not?
 * @param {string} source - whether to include the source of the error if it is in the error
 * @param {Boolean} stack - whether to include stack or not if <param>message</param> is an Error
 * @returns {string}
 */
module.exports.errorToString=function(error, {
	details=true,
	source=true,
	stack=false
}={}) {
	let text="";
	if(typeof (error)==="string") {
		text=`${text}${error}`;
	} else {
		if(source===false) {
			text=`${text}${error.message}`;
		} else if(error.hasOwnProperty("instance") && error.hasOwnProperty("method")) {
			text=`${text}${type.name(error.instance)}.${error.method}(): ${error.message}`;
		} else if(error.hasOwnProperty("instance")) {
			text=`${text}${type.name(error.instance)}: ${error.message}`;
		} else if(error.hasOwnProperty("method")) {
			text=`${text}${error.method}(): ${error.message}`;
		} else {
			text=`${text}${error.message}`;
		}
		if(details) {
			if(error.hasOwnProperty("details")) {
				text=`${text}. ${error.details}`;
			} else if(error.hasOwnProperty("error")) {
				text=`${text}. ${error.error}`;
			}
		}
		if(stack) {
			text=`${text}\n${diagnostics.groomStack(error.stack, {popCount: 1})}`;
		}
	}
	return text;
};

/**
 * This guy serves up text but text that adheres to a lazy convention we use for assertions and other functionality
 * for which we want lazy processing. The message may be the various things we know of that can be converted to text.
 * @param {undefined|string|Error|function():string} message
 * @param {string} dfault - if message is null or undefined
 * @param {Boolean} stack - whether to include stack or not if <param>message</param> is an Error
 * @returns {string}
 */
module.exports.messageToString=function(message, {
	dfault="",
	stack=false
}={}) {
	if(message instanceof Error) {
		return exports.errorToString(message, {stack});
	} else {
		let text;
		if(typeof (message)==="function") {
			text=message();
		} else {
			text=(message)
				? message.toString()
				: dfault;
		}
		if(stack) {
			text+=`\n${diagnostics.getStack({popCount: 1})}`;
		}
		return text;
	}
};
