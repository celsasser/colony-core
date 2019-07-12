/**
 * Date: 3/9/18
 * Time: 9:49 PM
 * @license MIT (see project's LICENSE file)
 */

const assert=require("colony-test").assert;
const array=require("../../../../lib/mutation").mutable.array;


describe("mutation.mutable.array", function() {
	describe("add", function() {
		it("should create an array if param is null", function() {
			assert.deepEqual(array.add(null, 1), [1]);
		});

		it("should append an element to an existing array", function() {
			const original=[1];
			array.add(original, 2);
			assert.deepEqual(original, [1, 2]);
		});

		it("should insert an element to an existing array", function() {
			const original=[1, 3];
			array.add(original, 2, 1);
			assert.deepEqual(original, [1, 2, 3]);
		});
	});

	describe("concat", function() {
		it("should return original if param is null", function() {
			assert.deepEqual(array.concat(null, [1]), [1]);
		});

		it("should append an element to an existing array", function() {
			const original=[1];
			array.concat(original, [2, 3]);
			assert.deepEqual(original, [1, 2, 3]);
		});

		it("should insert elements into an existing array", function() {
			const original=[1, 4];
			array.concat(original, [2, 3], 1);
			assert.deepEqual(original, [1, 2, 3, 4]);
		});
	});

	describe("omit", function() {
		it("should return null if array is null", function() {
			assert.strictEqual(array.omit(null, "path"), null);
		});

		it("should return source array with omitted property", function() {
			const source=[
				{a: "a1", b: "b1"},
				{a: "a2", b: "b2"}
			];
			const result=array.omit(source, "b");
			assert.strictEqual(result, source);
			assert.deepEqual(result, [
				{a: "a1"},
				{a: "a2"}
			]);
		});
	});

	describe("pick", function() {
		it("should return null if array is null", function() {
			assert.strictEqual(array.pick(null, "path"), null);
		});

		it("should return source array with picked property", function() {
			const source=[
				{a: "a1", b: "b1"},
				{a: "a2", b: "b2"}
			];
			const result=array.pick(source, "b");
			assert.strictEqual(result, source);
			assert.deepEqual(result, [
				{b: "b1"},
				{b: "b2"}
			]);
		});
	});

	describe("remove", function() {
		it("should remove an element by reference", function() {
			const original=["good", "bad"];
			array.remove(original, {element: "bad"});
			assert.deepEqual(original, ["good"]);
		});

		it("should remove an element by index", function() {
			const original=["good", "bad"];
			array.remove(original, {index: 0});
			assert.deepEqual(original, ["bad"]);
		});
	});

	describe("replace", function() {
		it("should replace an element by reference", function() {
			const original=["good", "bad"];
			array.replace(original, "new", {element: "bad"});
			assert.deepEqual(original, ["good", "new"]);
		});

		it("should replace an element by index", function() {
			const original=["good", "bad"];
			array.replace(original, "new", {index: 1});
			assert.deepEqual(original, ["good", "new"]);
		});
	});
});
