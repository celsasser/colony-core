/**
 * Date: 3/9/18
 * Time: 9:49 PM
 * @license MIT (see project's LICENSE file)
 */

const assert=require("colony-test").assert;
const proxy=require("colony-test").proxy;
const immutable=require("../../../../lib/mutation").immutable;
const mutable=require("../../../../lib/mutation").mutable;


describe("mutation.immutable.object", function() {
	afterEach(function() {
		proxy.unstub();
	});

	describe("clone", function() {
		it("should remain immutable", function() {
			const source={
					body: "data"
				},
				isImmutable=assert.immutable(source);
			const result=immutable.object.clone(source, "");
			assert.notStrictEqual(source, result);
			assert.deepEqual(result, source);
			isImmutable();
		});
	});

	describe("delete", function() {
		it("should clone the object and call down to mutable", function() {
			const source={
					a: "value"
				},
				result=immutable.object.delete(source, "a");
			assert.notStrictEqual(result, source);
			assert.deepEqual(result, {});
		});
	});

	describe("ensure", function() {
		it("should clone the object and call down to mutable", function() {
			const source={},
				result=immutable.object.ensure(source, "a", "value");
			assert.notStrictEqual(result, source);
			assert.deepEqual(result, {
				a: "value"
			});
		});
	});

	describe("scrub", function() {
		it("should return undefined if object param is undefined", function() {
			assert.strictEqual(immutable.object.scrub(undefined), undefined);
		});

		it("should return null if object param is null ", function() {
			assert.strictEqual(immutable.object.scrub(null), null);
		});

		it("should return string value if object param is a string", function() {
			assert.strictEqual(immutable.object.scrub("string"), "string");
		});

		it("should make a deep copy and call down to mutable.object.scrub", function() {
			const source={
				data: "dummy"
			};
			proxy.stub(mutable.object, "scrub", function(object, {
				recursive,
				removables
			}) {
				assert.strictEqual(recursive, "recursive");
				assert.strictEqual(removables, "removables");
				assert.notStrictEqual(object, source);
				assert.deepEqual(object, source, {
					scrub: false
				});
				return object;
			});
			const result=immutable.object.scrub(source, {
				recursive: "recursive",
				removables: "removables"
			});
			assert.notStrictEqual(result, source);
			assert.deepEqual(result, source, {
				scrub: false
			});
		});
	});

	describe("sort", function() {
		it("should return null if passed null", function() {
			assert.strictEqual(immutable.object.sort(null), null);
		});

		it("should return sort an object's properties", function() {
			const source={
				b1: {
					b2: "b2",
					a2: "a2"
				},
				a1: {
					b2: "b2",
					a2: "a2"
				}
			};
			const result=immutable.object.sort(source);
			assert.deepEqual(source, {
				b1: {
					b2: "b2",
					a2: "a2"
				},
				a1: {
					b2: "b2",
					a2: "a2"
				}
			});
			assert.deepEqual(result, {
				a1: {
					a2: "a2",
					b2: "b2"
				},
				"b1": {
					a2: "a2",
					b2: "b2"
				}
			});
		});
	});
});
