/**
 * Date: 2019-07-13
 * Time: 14:11
 * @license MIT (see project's LICENSE file)
 */

const assert=require("colony-test").assert;
const urn=require("../../lib/urn");

describe("urn", function() {
	describe("create", function() {
		it("should properly create a urn by path param", function() {
			const result=urn.create({
				path: "cat:george"
			});
			assert.matches(result, /^urn:cat:george:[\w_-]+$/);
		});

		it("should properly create a urn by parts param", function() {
			const result=urn.create({
				parts: ["cat", "george"]
			});
			assert.matches(result, /^urn:cat:george:[\w_-]+$/);
		});

		it("should use id specified as param if included", function() {
			const result=urn.create({
				parts: ["cat", "george"],
				unique: "id"
			});
			assert.strictEqual(result, "urn:cat:george:id");
		});
	});

	describe("parse", function() {
		it("should throw an exception if not a valid urn", function() {
			assert.throws(
				urn.parse.bind(null, "invalid"),
				error=>error.message==='invalid urn "invalid"'
			);
		});

		it("should properly parse with with array of parts result by default", function() {
			const {parts, unique}=urn.parse("urn:cat:george:id");
			assert.deepEqual(parts, ["cat", "george"]);
			assert.strictEqual(unique, "id");
		});

		it("should properly parse with with object of parts result if parts param is defined", function() {
			const {parts, unique}=urn.parse("urn:cat:george:id", ["species", "name"]);
			assert.deepEqual(parts, {
				species: "cat",
				name: "george"
			});
			assert.strictEqual(unique, "id");
		});

		it("should throw an exception if parts length does not match parsed length", function() {
			assert.throws(
				urn.parse.bind(null, "urn:cat:george:id", ["species"]),
				error=>error.message==='parts=["species"] is mismatched with urn urn:cat:george:id'
			);
		});
	});
});
