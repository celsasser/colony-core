/**
 * Date: 10/18/18
 * Time: 10:08 PM
 * @license MIT (see project's LICENSE file)
 *
 * @module colony-core/format
 */

const diagnostics=require("./diagnostics");

/**
 * Gets text suitable for user presentation. Does his best to find the important parts.
 * @param {Error|string} error
 * @param {string} details - whether to dig the details out of the error or not?
 * @param {string} instance - whether to dig the instance out of the error or not?
 * @param {Boolean} stack - whether to include stack or not if <param>message</param> is an Error
 * @returns {string}
 */
module.exports.errorToString=function(error, {
	details=true,
	instance=true,
	stack=false
}={}) {
	let text="";
	if(typeof (error)==="string") {
		text=`${text}${error}`;
	} else {
		if(instance && error.hasOwnProperty("instance")) {
			text=`${text}${error.instance.type}: ${error.message}`;
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
