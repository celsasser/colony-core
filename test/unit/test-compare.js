/**
 * Date: 05/27/18
 * Time: 7:15 PM
 */

const assert=require("../support/assert");
const compare=require("../../lib/compare");


describe("compare", function() {
	describe("any", function() {
		it("should return 0 if objects are the same", function() {
			assert.strictEqual(compare.any(null, null), 0);
			assert.strictEqual(compare.any(1, 1), 0);
			assert.strictEqual(compare.any("1", "1"), 0);
		});

		it("should return proper values when one param is null and the other is not", function() {
			assert.strictEqual(compare.any(1, undefined), -1);
			assert.strictEqual(compare.any(1, null), -1);
			assert.strictEqual(compare.any(undefined, 1), 1);
			assert.strictEqual(compare.any(null, 1), 1);
		});

		it("should do date compare if dates", function() {
			const date1=new Date("2000-01-01"),
				date2=new Date("2001-01-01");
			assert.strictEqual(compare.any(date1, date2), -1);
			assert.strictEqual(compare.any(date2, date1), 1);
		});

		it("should do string compare if string", function() {
			assert.strictEqual(compare.any("a", "a"), 0);
			assert.strictEqual(compare.any("a", "b"), -1);
			assert.strictEqual(compare.any("b", "a"), 1);
			assert.strictEqual(compare.any("A", "a"), 1);
			assert.strictEqual(compare.any("a", "A"), -1);
			assert.strictEqual(compare.any("a", "A", {ignoreCase: true}), 0);
		});

		it("should default to treating as numbers", function() {
			assert.strictEqual(compare.any(0, 0), 0);
			assert.strictEqual(compare.any(1, 0), 1);
			assert.strictEqual(compare.any(0, 1), -1);
		});
	});

	describe("string", function() {
		it("should return 0 if params are effectively null", function() {
			assert.strictEqual(compare.string(undefined, undefined), 0);
			assert.strictEqual(compare.string(null, null), 0);
			assert.strictEqual(compare.string(undefined, null), 0);
		});

		it("should properly compare params of the same case", function() {
			assert.strictEqual(compare.string(null, "a"), 1);
			assert.strictEqual(compare.string("a", null), -1);
			assert.strictEqual(compare.string("a", "a"), 0);
			assert.strictEqual(compare.string("a", "b"), -1);
			assert.strictEqual(compare.string("b", "a"), 1);
		});

		it("should ignore case by default", function() {
			assert.strictEqual(compare.string("a", "A"), 0);
		});

		it("should not ignore case if told not to", function() {
			assert.strictEqual(compare.string("a", "A", {
				ignoreCase: false
			}), -1);
			assert.strictEqual(compare.string("A", "a", {
				ignoreCase: false
			}), 1);
		});
	});
});
