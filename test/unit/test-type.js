/**
 * Date: 05/27/18
 * Time: 7:15 PM
 */

const assert=require("assert");
const type=require("../../dist/type");


describe("type", function() {
	describe("name", function() {
		it("should properly get name of null", function() {
			assert.strictEqual(type.name(null), "null");
		});

		it("should properly get name of value type", function() {
			assert.strictEqual(type.name(undefined), "undefined");
		});

		it("should properly get name of number", function() {
			assert.strictEqual(type.name(1), "Number");
			assert.strictEqual(type.name(new Number(1)), "Number");
		});

		it("should properly get name of string", function() {
			assert.strictEqual(type.name("s"), "String");
			assert.strictEqual(type.name(new String("s")), "String");
		});

		it("should properly get name of object", function() {
			assert.strictEqual(type.name({}), "Object");
		});

		it("should properly get name of class", function() {
			class Dummy {}

			assert.strictEqual(type.name(new Dummy()), "Dummy");
		});
	});
});
