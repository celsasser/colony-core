/**
 * Date: 3/9/18
 * Time: 9:49 PM
 * @license MIT (see project's LICENSE file)
 */

const assert=require("../../../support/assert");
const array=require("../../../../lib/mutation").immutable.array;


describe("mutation.immutable.array", function() {
	describe("add", function() {
		it("should create an array if param is null", function() {
			assert.deepEqual(array.add(null, 1), [1]);
		});

		it("should append an element to an existing array", function() {
			const original=[1],
				assertImmutable=assert.immutable(original);
			assert.deepEqual(array.add(original, 2), [1, 2]);
			assert.doesNotThrow(assertImmutable);
		});

		it("should insert an element to an existing array", function() {
			const original=[1, 3],
				assertImmutable=assert.immutable(original);
			assert.deepEqual(array.add(original, 2, 1), [1, 2, 3]);
			assert.doesNotThrow(assertImmutable);
		});
	});

	describe("concat", function() {
		it("should return original if param is null", function() {
			assert.deepEqual(array.concat(null, [1]), [1]);
		});

		it("should append an element to an existing array", function() {
			const original=[1],
				assertImmutable=assert.immutable(original);
			assert.deepEqual(array.concat(original, [2, 3]), [1, 2, 3]);
			assert.doesNotThrow(assertImmutable);
		});

		it("should insert elements into an existing array", function() {
			const original=[1, 4],
				assertImmutable=assert.immutable(original);
			assert.deepEqual(array.concat(original, [2, 3], 1), [1, 2, 3, 4]);
			assert.doesNotThrow(assertImmutable);
		});
	});

	describe("omit", function() {
		it("should return [] if array is null", function() {
			assert.deepEqual(array.omit(null, "path"), []);
		});

		it("should return source array with omitted property", function() {
			const source=[
				{a: "a1", b: "b1"},
				{a: "a2", b: "b2"}
			];
			const result=array.omit(source, "b");
			assert.deepEqual(source, [
				{a: "a1", b: "b1"},
				{a: "a2", b: "b2"}
			]);
			assert.deepEqual(result, [
				{a: "a1"},
				{a: "a2"}
			]);
		});
	});

	describe("pick", function() {
		it("should return [] if array is null", function() {
			assert.deepEqual(array.pick(null, "path"), []);
		});

		it("should return source array with picked property", function() {
			const source=[
				{a: "a1", b: "b1"},
				{a: "a2", b: "b2"}
			];
			const result=array.pick(source, "b");
			assert.deepEqual(source, [
				{a: "a1", b: "b1"},
				{a: "a2", b: "b2"}
			]);
			assert.deepEqual(result, [
				{b: "b1"},
				{b: "b2"}
			]);
		});
	});

	describe("remove", function() {
		it("should remove an element by reference", function() {
			const original=["good", "bad"],
				assertImmutable=assert.immutable(original);
			assert.deepEqual(array.remove(original, {element: "bad"}), ["good"]);
			assert.doesNotThrow(assertImmutable);
		});

		it("should remove an element by index", function() {
			const original=["good", "bad"],
				assertImmutable=assert.immutable(original);
			assert.deepEqual(array.remove(original, {index: 0}), ["bad"]);
			assert.doesNotThrow(assertImmutable);
		});
	});

	describe("replace", function() {
		it("should replace an element by reference", function() {
			const original=["good", "bad"],
				assertImmutable=assert.immutable(original);
			assert.deepEqual(array.replace(original, "new", {element: "bad"}), ["good", "new"]);
			assert.doesNotThrow(assertImmutable);
		});

		it("should replace an element by index", function() {
			const original=["good", "bad"],
				assertImmutable=assert.immutable(original);
			assert.deepEqual(array.replace(original, "new", {index: 1}), ["good", "new"]);
			assert.doesNotThrow(assertImmutable);
		});
	});
});
