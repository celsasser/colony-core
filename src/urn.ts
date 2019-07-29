/**
 * Date: 2019-07-13
 * Time: 13:42
 * @license MIT (see project's LICENSE file)
 *
 */

const shortid=require("shortid");

/**
 * Creates a urn either by <param>path</param> or by <param>parts</param>:
 *  - path: "urn:<path>:<unique>"
 *  - parts: "urn:<parts[0]>:<parts[2]>...<parts[n-1]>:<unique>"
 * @param {string} path
 * @param {Array<string>} parts
 * @param {string} unique
 * @returns {string}
 */
function create({
	path=undefined,
	parts=undefined,
	unique=shortid.generate()
}) {
	if(path!==undefined) {
		return `urn:${path}:${unique}`;
	} else {
		return `urn:${parts.join(":")}:${unique}`;
	}
}

/**
 * Parses a urn and returns bits
 * @param {string} urn
 * @param {Array<string>} parts - an array of names that will be the names given to the parsed "parts". "urn" will not be included.
 * @returns {{parts:(Array<string>|Object), unique:string}}
 * @throws {Error}
 */
function parse(urn, parts=undefined) {
	const match=urn.match(/^urn:(([\w_-]+):){1,}([\w_-]+)$/);
	if(match===null) {
		throw new Error(`invalid urn "${urn}"`);
	} else {
		const split=urn.split(":");
		if(parts===undefined) {
			return {
				parts: split.slice(1, split.length-1),
				unique: split[split.length-1]
			};
		} else {
			if(parts.length!==split.length-2) {
				throw new Error(`parts=${JSON.stringify(parts)} is mismatched with urn ${urn}`);
			}
			return {
				parts: parts.reduce((result, part, index)=>{
					result[part]=split[index+1];
					return result;
				}, {}),
				unique: split[split.length-1]
			};
		}
	}
}

module.exports={
	create,
	parse
};

