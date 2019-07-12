/**
 * Date: 2/8/18
 * Time: 9:48 PM
 * @license MIT (see project's LICENSE file)
 */

const assert=require("colony-test").assert;
const {ColonyError}=require("../../lib/error");
const format=require("../../lib/format");


describe("format", function() {
	describe("errorToString", function() {
		it("should convert an error to a string by default without a stack", function() {
			const error=new Error("failed");
			assert.strictEqual(format.errorToString(error), "failed");
		});

		it("should convert an error to a string by with a stack if requested", function() {
			const error=new Error("failed");
			assert.startsWith(format.errorToString(error, {
				stack: true
			}), "failed\n");
		});

		it("should include instance if included and requested", function() {
			class DummyClass {}

			const error=new ColonyError({
				instance: new DummyClass(),
				message: "message"
			});
			assert.strictEqual(format.errorToString(error, {
				source: true
			}), "DummyClass: message");
		});

		it("should include method if included and requested", function() {
			const error=new ColonyError({
				method: "method",
				message: "message"
			});
			assert.strictEqual(format.errorToString(error, {
				source: true
			}), "method(): message");
		});

		it("should include instance and method if included and requested", function() {
			class DummyClass {}

			const error=new ColonyError({
				instance: new DummyClass(),
				message: "message",
				method: "method"
			});
			assert.strictEqual(format.errorToString(error, {
				source: true
			}), "DummyClass.method(): message");
		});
	});

	describe("messageToString", function() {
		it("should convert an error to a string by default without a stack", function() {
			const error=new Error("failed");
			assert.strictEqual(format.messageToString(error), "failed");
		});

		it("should convert an error to a string by with a stack if requested", function() {
			const error=new Error("failed");
			assert.notStrictEqual(format.messageToString(error, {stack: true}), "failed");
		});

		it("should convert a function to a string by without a stack", function() {
			assert.strictEqual(format.messageToString(()=>"message"), "message");
		});

		it("should convert a function to a string by with a stack if requested", function() {
			assert.notStrictEqual(format.messageToString(()=>"message", {stack: true}), "message");
		});
	});
});
