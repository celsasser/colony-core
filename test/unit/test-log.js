/**
 * Date: 2019-07-12
 * Time: 22:05
 * @license MIT (see project's LICENSE file)
 */

const assert=require("colony-test").assert;
const proxy=require("colony-test").proxy;
const severity=require("../../lib/enum/severity");
const {
	LogBase
}=require("../../lib/log");

describe("log.LogBase", function() {
	afterEach(function() {
		proxy.unstub();
	});

	describe("constructor", function() {
		it("should properly create the instance", function() {
			const log=new LogBase({
				applicationId: "applicationId",
				environmentId: "environmentId",
				sortMetadata: true,
				threshold: severity.enum.WARN
			});
			assert.strictEqual(log.applicationId, "applicationId");
			assert.strictEqual(log.environmentId, "environmentId");
			assert.strictEqual(log.sortMetadata, true);
			assert.strictEqual(log.threshold, severity.enum.WARN);
		});
	});

	[
		["debug", severity.enum.DEBUG],
		["error", severity.enum.ERROR],
		["fatal", severity.enum.FATAL],
		["info", severity.enum.INFO],
		["warn", severity.enum.WARN]
	].forEach(([method, _severity])=>{
		describe(method, function() {
			it(`should properly call _processEntry with severity="${_severity}" and proper param values`, function() {
				const log=new LogBase({
					applicationId: "applicationId",
					environmentId: "environmentId"
				});
				proxy.stub(log, "_processEntry", function(message, {
					metadata,
					moduleId,
					severity
				}) {
					assert.strictEqual(message, "message");
					assert.strictEqual(metadata, "metadata");
					assert.strictEqual(moduleId, "moduleId");
					assert.strictEqual(severity, _severity);
				});
				log[method]("message", {
					metadata: "metadata",
					moduleId: "moduleId"
				});
				assert.strictEqual(log._processEntry.callCount, 1);
			});
		});
	});

	describe("_processEntry", function() {
		[
			[severity.enum.DEBUG],
			[severity.enum.ERROR],
			[severity.enum.FATAL],
			[severity.enum.INFO],
			[severity.enum.WARN]
		].forEach(severity=>{
			it(`should process ${severity} if no threshold is specified and call _processEntry with proper arguments`, function() {
				const log=new LogBase({
					applicationId: "applicationId",
					environmentId: "environmentId"
				});
				const timestamp=new Date("2000-01-01T00:00:00.000Z");
				proxy.stubDate(timestamp);
				proxy.stub(log, "_logEntry", function(message, metadata) {
					assert.strictEqual(message, "message");
					assert.deepEqual(metadata, {
						applicationId: "applicationId",
						environmentId: "environmentId",
						moduleId: "moduleId",
						severity,
						timestamp
					});
				});
				log._processEntry("message", {
					moduleId: "moduleId",
					severity
				});
				assert.strictEqual(log._logEntry.callCount, 1);
			});
		});

		[
			[severity.enum.DEBUG, false],
			[severity.enum.INFO, false],
			[severity.enum.WARN, true],
			[severity.enum.ERROR, true],
			[severity.enum.FATAL, true]
		].forEach(([_severity, process])=>{
			it(`should properly ${process ? "process" : "bypass"} if severity=${_severity} and threshold=${severity.enum.WARN}`, function() {
				const log=new LogBase({
					applicationId: "applicationId",
					environmentId: "environmentId",
					threshold: severity.enum.WARN
				});
				proxy.spy(log, "_logEntry");
				log._processEntry("message", {
					moduleId: "moduleId",
					severity: _severity
				});
				assert.strictEqual(log._logEntry.callCount, (process) ? 1 : 0);
			});
		});

		it("should sort metadata properties if asked to", function() {
			const log=new LogBase({
				applicationId: "applicationId",
				environmentId: "environmentId",
				sortMetadata: true
			});
			const timestamp=new Date("2000-01-01T00:00:00.000Z");
			proxy.stubDate(timestamp);
			proxy.stub(log, "_logEntry", function(message, metadata) {
				assert.deepEqual(metadata, {
					applicationId: "applicationId",
					environmentId: "environmentId",
					metadata: {
						"a": 1,
						"b": 2
					},
					moduleId: "moduleId",
					severity: "severity",
					timestamp: timestamp
				});
			});
			log._processEntry("message", {
				metadata: {
					b: 2,
					a: 1
				},
				moduleId: "moduleId",
				severity: "severity"
			});
		});

		it("should not sort metadata properties if not asked to", function() {
			const log=new LogBase({
				applicationId: "applicationId",
				environmentId: "environmentId",
				sortMetadata: false
			});
			const timestamp=new Date("2000-01-01T00:00:00.000Z");
			proxy.stubDate(timestamp);
			proxy.stub(log, "_logEntry", function(message, metadata) {
				assert.deepEqual(metadata, {
					applicationId: "applicationId",
					environmentId: "environmentId",
					metadata: {
						"b": 2,
						"a": 1
					},
					moduleId: "moduleId",
					severity: "severity",
					timestamp: timestamp
				});
			});
			log._processEntry("message", {
				metadata: {
					b: 2,
					a: 1
				},
				moduleId: "moduleId",
				severity: "severity"
			});
		});
	});
});
