/**
 * Date: 12/8/17
 * Time: 8:05 PM
 * @license MIT (see project's LICENSE file)
 */

const assert=require("assert");
const {
	HttpMethod,
	HttpStatusCode,
	HttpStatusText,
	Priority,
	Severity,
	testSeverity
}=require("../../dist/enum");

describe("enum", function() {
	describe("HttpMethod", function() {
		it("should encode values to be the same as the keyword", function() {
			assert.strictEqual(HttpMethod.CONNECT, "CONNECT");
			assert.strictEqual(HttpMethod.DELETE, "DELETE");
			assert.strictEqual(HttpMethod.GET, "GET");
			assert.strictEqual(HttpMethod.HEAD, "HEAD");
			assert.strictEqual(HttpMethod.OPTIONS, "OPTIONS");
			assert.strictEqual(HttpMethod.POST, "POST");
			assert.strictEqual(HttpMethod.PUT, "PUT");
		});
	});

	describe("HttpStatusCode", function() {
		it("should encode enum values as numbers", function() {
			assert.strictEqual(HttpStatusCode.OK, 200);
		});
	});

	describe("HttpStatusText", function() {
		it("should encode the proper text for enum values", function() {
			assert.strictEqual(HttpStatusText[HttpStatusCode.OK], "OK");
		});
	});

	describe("Priority", function() {
		it("should encode values to be lowercase version of keyword", function() {
			assert.strictEqual(Priority.LOW, "low");
			assert.strictEqual(Priority.MEDIUM, "medium");
			assert.strictEqual(Priority.HIGH, "high");
		});
	});

	describe("Severity", function() {
		it("should encode values to be lowercase version of keyword", function() {
			assert.strictEqual(Severity.DEBUG, "debug");
			assert.strictEqual(Severity.INFO, "info");
			assert.strictEqual(Severity.WARN, "warn");
			assert.strictEqual(Severity.ERROR, "error");
			assert.strictEqual(Severity.FATAL, "fatal");
		});
	});

	describe("testSeverity", function() {
		it("should properly evaluate values", function() {
			assert.strictEqual(testSeverity(Severity.DEBUG, Severity.WARN), false);
			assert.strictEqual(testSeverity(Severity.INFO, Severity.WARN), false);
			assert.strictEqual(testSeverity(Severity.WARN, Severity.WARN), true);
			assert.strictEqual(testSeverity(Severity.ERROR, Severity.WARN), true);
			assert.strictEqual(testSeverity(Severity.FATAL, Severity.WARN), true);
		});
	});
});
