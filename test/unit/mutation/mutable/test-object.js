/**
 * Date: 3/9/18
 * Time: 9:49 PM
 * @license MIT (see project's LICENSE file)
 */

const assert=require("../../../support/assert");
const object=require("../../../../lib/mutation").mutable.object;


describe("mutation.mutable.object", function() {
	describe("delete", function() {
		it("should not do anything if object is empty", function() {
			assert.deepEqual(object.delete({}, "a"), {});
		});

		it("should not do anything if path does not exist", function() {
			const result=object.delete({
				a: {b: 1}
			}, "a.c");
			assert.deepEqual(result, {
				a: {b: 1}
			});
		});

		it("should delete root if no depth", function() {
			const result=object.delete({
				a: {b: 1}
			}, "a");
			assert.deepEqual(result, {});
		});

		it("should nested property properly", function() {
			const result=object.delete({
				a: {
					b: {
						c: 1,
						d: 2
					}
				}
			}, "a.b.c");
			assert.deepEqual(result, {
				a: {
					b: {d: 2}
				}
			});
		});

		it("should delete array element if target is an array", function() {
			const result=object.delete({
				a: [1, 2]
			}, "a.1");
			assert.deepEqual(result, {a: [1]});
		});
	});

	describe("ensure", function() {
		it("should set an object and return the value", function() {
			const source={a: 1},
				result=object.ensure(source, "b", 2);
			assert.deepEqual(result, {
				a: 1,
				b: 2
			});
		});

		it("should find an existing value, not update it and return it", function() {
			const source={
					a: {
						b: 1
					}
				},
				result=object.ensure(source, "a", {});
			assert.deepEqual(result, {
				a: {
					b: 1
				}
			});
		});
	});


	describe("scrub", function() {
		it("should return undefined if object param is undefined", function() {
			assert.strictEqual(object.scrub(undefined), undefined);
		});

		it("should return null if object param is null ", function() {
			assert.strictEqual(object.scrub(null), null);
		});

		it("should return string value if object param is a string", function() {
			assert.strictEqual(object.scrub("string"), "string");
		});

		it("should return empty object if object param is a {}", function() {
			assert.deepEqual(object.scrub({}), {});
		});

		it("should not recurse if told not to", function() {
			const scrubbed=object.scrub({
				a: {
					b: undefined
				}
			}, {
				recursive: false
			});
			assert.deepEqual(scrubbed, {
				a: {
					b: undefined
				}
			}, {
				scrub: false
			});
		});

		it("should recurse if told to", function() {
			const scrubbed=object.scrub({
				a: {
					b: undefined
				}
			}, {
				recursive: true
			});
			assert.deepEqual(scrubbed, {
				a: {}
			}, {
				scrub: false
			});
		});

		it("should remove shallow undefined property", function() {
			const scrubbed=object.scrub({
				a: "a",
				b: undefined
			});
			assert.deepEqual(scrubbed, {a: "a"}, {
				scrub: false
			});
		});

		it("should remove deep undefined property if recursive==true", function() {
			const scrubbed=object.scrub({
				a: {
					b: undefined
				}
			});
			assert.deepEqual(scrubbed, {
				a: {}
			}, {
				scrub: false
			});
		});

		it("should remove extended set of objects in removables param", function() {
			const scrubbed=object.scrub({
				a: {
					b: undefined,
					c: null
				}
			}, {
				recursive: true,
				removables: [undefined, null, {}]
			});
			assert.deepEqual(scrubbed, {});
		});

		it("should remove removables from objects in an array", function() {
			const scrubbed=object.scrub([
				{
					a: "a",
					b: undefined
				}
			]);
			assert.deepEqual(scrubbed, [
				{a: "a"}
			], {
				scrub: false
			});
		});
	});
});
