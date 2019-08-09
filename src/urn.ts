/**
 * Date: 2019-07-13
 * Time: 13:42
 * @license MIT (see project's LICENSE file)
 *
 */

const shortid = require("shortid");

/**
 * Creates a urn either by <param>path</param> or by <param>parts</param>:
 *  - path: "urn:<path>:<unique>"
 *  - parts: "urn:<parts[0]>:<parts[2]>...<parts[n-1]>:<unique>"
 */
export function create({
	path = undefined,
	parts = undefined,
	unique = shortid.generate()
}: {
	path?: string,
	parts?: string[],
	unique: string
}): string {
	if(path !== undefined) {
		return `urn:${path}:${unique}`;
	} else if(parts) {
		return `urn:${parts.join(":")}:${unique}`;
	} else {
		throw new Error("must specify path or parts");
	}
}

/**
 * Parses a urn and returns bits
 * @throws {Error}
 */
export function parse(urn: string, parts? : string[]): {
	parts: string[]|{[index:string]:string},
	unique: string
} {
	const match = urn.match(/^urn:(([\w_-]+):){1,}([\w_-]+)$/);
	if(match === null) {
		throw new Error(`invalid urn "${urn}"`);
	} else {
		const split = urn.split(":");
		if(parts === undefined) {
			return {
				parts: split.slice(1, split.length - 1),
				unique: split[split.length - 1]
			};
		} else {
			if(parts.length !== split.length - 2) {
				throw new Error(`parts=${JSON.stringify(parts)} is mismatched with urn ${urn}`);
			}
			return {
				parts: parts.reduce((result:{[index:string]:string}, part:string, index:number) => {
					result[part] = split[index + 1];
					return result;
				}, {}),
				unique: split[split.length - 1]
			};
		}
	}
}
