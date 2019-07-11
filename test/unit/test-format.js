/**
 * Date: 2/8/18
 * Time: 9:48 PM
 * @license MIT (see project's LICENSE file)
 */

const assert=require("../support/assert");
const format=require("../../lib/format");


describe("format", function() {
	describe("errorToString", function() {
		it("should convert an error to a string by default without a stack", function() {
			const error=new Error("failed");
			assert.equal(format.errorToString(error), "failed");
		});

		it("should convert an error to a string by with a stack if requested", function() {
			const error=new Error("failed");
			assert.notEqual(format.errorToString(error, {stack: true}), "failed");
		});
	});

	describe("messageToString", function() {
		it("should convert an error to a string by default without a stack", function() {
			const error=new Error("failed");
			assert.equal(format.messageToString(error), "failed");
		});

		it("should convert an error to a string by with a stack if requested", function() {
			const error=new Error("failed");
			assert.notEqual(format.messageToString(error, {stack: true}), "failed");
		});

		it("should convert a function to a string by without a stack", function() {
			assert.equal(format.messageToString(()=>"message"), "message");
		});

		it("should convert a function to a string by with a stack if requested", function() {
			assert.notEqual(format.messageToString(()=>"message", {stack: true}), "message");
		});
	});
});
