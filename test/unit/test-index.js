/**
 * Date: 11/1/18
 * Time: 12:21 AM
 * @license MIT (see project's LICENSE file)
 */

const assert=require("colony-test").assert;
const index=require("../../dist/index");
const compare=require("../../dist/compare");
const date=require("../../dist/date");
const diagnostics=require("../../dist/diagnostics");
const enums=require("../../dist/enum");
const error=require("../../dist/error");
const format=require("../../dist/format");
const log=require("../../dist/log");
const mutation=require("../../dist/mutation");
const promise=require("../../dist/promise");
const template=require("../../dist/template");
const type=require("../../dist/type");
const urn=require("../../dist/urn");

describe("index", function() {
	[
		["ColonyError", index.ColonyError, error.ColonyError],
		["compare", index.compare, compare],
		["date", index.date, date],
		["diagnostics", index.diagnostics, diagnostics],
		["format", index.format, format],
		["getHttpStatusText", index.getHttpStatusText, enums.getHttpStatusText],
		["HttpMethod", index.HttpMethod, enums.HttpMethod],
		["HttpStatusCode", index.HttpStatusCode, enums.HttpStatusCode],
		["HttpStatusText", index.HttpStatusText, enums.HttpStatusText],
		["immutable", index.immutable, mutation.immutable],
		["LogBase", index.LogBase, log.LogBase],
		["mutable", index.mutable, mutation.mutable],
		["Priority", index.Priority, enums.Priority],
		["promise", index.promise, promise],
		["Severity", index.Severity, enums.Severity],
		["template", index.template, template],
		["testSeverity", index.testSeverity, enums.testSeverity],
		["type", index.type, type],
		["urn", index.urn, urn]
	].forEach(([name, indexReference, internalReference])=>{
		it(`should properly export ${name}`, function() {
			assert.strictEqual(indexReference, internalReference, `${name} test failed`);
		});
	});
});
