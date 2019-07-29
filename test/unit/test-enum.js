/**
 * Date: 12/8/17
 * Time: 8:05 PM
 * @license MIT (see project's LICENSE file)
 */

const assert=require("assert");
const {
	isValid,
	severity
}=require("../../dist/enum");

describe("enum", function() {
	describe("isValid", function() {
		it("should properly identify a valid property", function() {
			assert.strictEqual(isValid(severity.enum, severity.enum.DEBUG), true);
		});

		it("should properly identify an invalid property", function() {
			assert.strictEqual(isValid(severity.enum, "purple"), false);
		});
	});

	describe("severity", function() {
		describe("test", function() {
			it("should properly evaluate values", function() {
				assert.strictEqual(severity.test(severity.enum.DEBUG, severity.enum.WARN), false);
				assert.strictEqual(severity.test(severity.enum.INFO, severity.enum.WARN), false);
				assert.strictEqual(severity.test(severity.enum.WARN, severity.enum.WARN), true);
				assert.strictEqual(severity.test(severity.enum.ERROR, severity.enum.WARN), true);
				assert.strictEqual(severity.test(severity.enum.FATAL, severity.enum.WARN), true);
			});
		});
	});
});
