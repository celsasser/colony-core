/**
 * Date: 05/27/18
 * Time: 7:15 PM
 */

const _=require("lodash");
const assert=require("colony-test").assert;
const {ColonyError}=require("../../dist/error");

describe("error", function() {
	describe("ColonyError", function() {
		function _toPOJO(error) {
			return _(error)
				.pick(Object.getOwnPropertyNames(error))
				.omit(["stack"])
				.value();
		}

		describe("constructor", function() {
			it("should populate all supported params properly", function() {
				const instance=new ColonyError({
					details: "details",
					error: new Error("error"),
					instance: "instance",
					message: "message",
					method: "method",
					statusCode: 100
				});
				assert.deepEqual(_toPOJO(instance), {
					details: "details",
					error: new Error("error"),
					instance: "instance",
					message: "message",
					method: "method",
					statusCode: 100
				});
			});

			it("should properly derive 'message' from 'error' param", function() {
				const error=new Error("message"),
					instance=new ColonyError({error});
				assert.deepEqual(_toPOJO(instance), {
					message: "message",
					error: error
				});
			});

			it("make properly derive 'details' from fallback params", function() {
				assert.deepEqual(_toPOJO(new ColonyError({
					error: new Error("details"),
					message: "message"
				})), {
					details: "details",
					error: new Error("details"),
					message: "message"
				});
				assert.deepEqual(_toPOJO(new ColonyError({
					message: "message",
					statusCode: 100
				})), {
					details: "Continue (100)",
					message: "message",
					statusCode: 100
				});
			});

			it("should inherit the 'error' param's stack", function() {
				const error=new Error();
				error.stack="stack";
				const instance=new ColonyError({error});
				assert.strictEqual(instance.stack, "stack");
			});
		});
	});
});
