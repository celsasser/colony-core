/**
 * Date: 12/8/17
 * Time: 8:05 PM
 * @license MIT (see project's LICENSE file)
 */

const assert=require("assert");
const {
	isValid,
	severity
}=require("../../lib/enum");

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
		describe("trips", function() {
			it("should properly evaluate values", function() {
				assert.strictEqual(severity.trips(severity.enum.DEBUG, severity.enum.WARN), false);
				assert.strictEqual(severity.trips(severity.enum.INFO, severity.enum.WARN), false);
				assert.strictEqual(severity.trips(severity.enum.WARN, severity.enum.WARN), true);
				assert.strictEqual(severity.trips(severity.enum.ERROR, severity.enum.WARN), true);
				assert.strictEqual(severity.trips(severity.enum.FATAL, severity.enum.WARN), true);
			});
		});
	});
});
