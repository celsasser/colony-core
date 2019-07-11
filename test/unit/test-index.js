/**
 * Date: 11/1/18
 * Time: 12:21 AM
 * @license MIT (see project's LICENSE file)
 */

const _=require("lodash");
const assert=require("../support/assert");
const index=require("../../lib/index");

describe("index", function() {
	it("should properly import each public module", function() {
		const set=new Set(),
			moduleNames=[
				"compare",
				"date",
				"diagnostics",
				"enum",
				"error",
				"format",
				"mutation",
				"promise",
				"template",
				"type"
			];
		moduleNames.forEach((name)=>{
			const moduleLoad=_.get(index, name),
				moduleCache=_.get(index, name);
			assert.equal(typeof (moduleLoad), "object", `module=${name} failed`);
			assert.strictEqual(moduleLoad, moduleCache);
			set.add(moduleLoad);
		});
		assert.equal(moduleNames.length, set.size);
	});
});
