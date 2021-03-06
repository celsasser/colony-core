/**
 * Date: 2019-03-29
 * Time: 21:50
 * @license MIT (see project's LICENSE file)
 */

const assert=require("colony-test").assert;
const promise=require("../../dist/promise");

describe("promise", function() {
	describe("rejectNextTick", function() {
		it("should reject on next tick", async function() {
			const error=new Error("failed");
			return promise.rejectNextTick(error)
				.catch(param=>assert.strictEqual(param, error));
		});
	});

	describe("resolveNextTick", function() {
		it("should resolve on next tick", async function() {
			return promise.resolveNextTick("input")
				.then(value=>assert.strictEqual(value, "input"));
		});
	});

	describe("series", function() {
		it("should properly create and return a promise chain", function(done) {
			const accumulator=[];
			promise.series([
				()=>new Promise((resolve)=>{
					accumulator.push(1);
					resolve();
				}),
				()=>new Promise((resolve)=>{
					accumulator.push(2);
					resolve();
				}),
				()=>new Promise((resolve)=>{
					accumulator.push(3);
					resolve();
				})
			]).then(()=>{
				assert.deepEqual(accumulator, [1, 2, 3]);
				done();
			});
		});
	});
});
