/**
 * Date: 05/27/18
 * Time: 7:15 PM
 */

const assert=require("colony-test").assert;
const {
	add,
	fromString,
	fromValue,
	isEqual,
	toISOString
}=require("../../lib/date");


describe("date", function() {
	describe("add", function() {
		it("should return date if no additions are made", function() {
			const date=new Date(),
				result=add(date, {});
			assert.strictEqual(date.getTime(), result.getTime());
		});

		it("should properly add positive millis", function() {
			const date=new Date(),
				result=add(date, {
					millis: 100
				});
			assert.strictEqual(date.getTime(), result.getTime()-100);
		});

		it("should properly add negative millis", function() {
			const date=new Date(),
				result=add(date, {
					millis: -100
				});
			assert.strictEqual(date.getTime(), result.getTime()+100);
		});

		it("should properly add positive seconds", function() {
			const date=new Date(),
				result=add(date, {
					seconds: 1
				});
			assert.strictEqual(date.getTime(), result.getTime()-1000);
		});

		it("should properly add negative seconds", function() {
			const date=new Date(),
				result=add(date, {
					seconds: -1
				});
			assert.strictEqual(date.getTime(), result.getTime()+1000);
		});

		it("should properly add minutes", function() {
			const date=new Date(),
				result=add(date, {
					minutes: 1
				});
			assert.strictEqual(date.getTime(), result.getTime()-1000*60);
		});

		it("should properly add hours", function() {
			const date=new Date(),
				result=add(date, {
					hours: 1
				});
			assert.strictEqual(date.getTime(), result.getTime()-1000*60*60);
		});

		it("should properly add days", function() {
			const date=new Date(),
				result=add(date, {
					days: 1
				});
			assert.strictEqual(date.getTime(), result.getTime()-1000*60*60*24);
		});

		it("should properly add combination of all params", function() {
			const date=new Date(),
				result=add(date, {
					millis: 1,
					seconds: 1,
					minutes: 1,
					hours: 1,
					days: 1
				});
			assert.strictEqual(date.getTime(), result.getTime()
				-1
				-1000
				-1000*60
				-1000*60*60
				-1000*60*60*24
			);
		});
	});

	describe("isEqual", function() {
		it("should return true if dates are the same", function() {
			const date1=new Date("2000-01-01T12:00:00.000Z"),
				date2=new Date("2000-01-01T12:00:00.000Z");
			assert.strictEqual(isEqual(date1, date2), true);
		});

		it("should return false if dates are different", function() {
			const date1=new Date("2000-01-01T12:00:00.000Z"),
				date2=new Date("2001-01-01T12:00:00.000Z");
			assert.strictEqual(isEqual(date1, date2), false);
		});

		it("should handle null and undefined values", function() {
			assert.strictEqual(isEqual(undefined, undefined), true);
			assert.strictEqual(isEqual(null, null), true);
			assert.strictEqual(isEqual(new Date(), null), false);
			assert.strictEqual(isEqual(null, new Date()), false);
		});
	});

	describe("fromString", function() {
		it("should return null with null string", function() {
			assert.ok(fromString(null)===null);
		});

		it("should return parsed date for known encoding", function() {
			const date=new Date(),
				decoded=fromValue(date.toISOString());
			assert.deepEqual(date, decoded);
		});

		it("should throw exception with invalid string", function() {
			assert.throws(
				fromString.bind(null, "invalid"),
				(error)=>error.message==="invalid date invalid"
			);
		});
	});

	describe("fromValue", function() {
		it("should detect date type and return object itself", function() {
			const date=new Date();
			assert.strictEqual(fromValue(date), date);
		});

		it("should detect string and return converted object", function() {
			const date=new Date();
			assert.deepEqual(fromValue(date.toISOString()), date);
		});

		it("should detect string and return converted object", function() {
			assert.deepEqual(fromValue(0), new Date(0));
		});

		it("should detect string and return converted object", function() {
			assert.strictEqual(fromValue(null), null);
		});

		it("should throw exception if it can't make sense of the input", function() {
			assert.throws(
				fromValue.bind(null, {}),
				(error)=>error.message==="unknown date value [object Object]"
			);
		});
	});


	describe("toISOString", function() {
		it("toISOString not should strip millis with no milli param", function() {
			const date=new Date(),
				encoded=toISOString(date);
			assert.ok(encoded.search(/\.\d+Z$/)> -1);
		});

		it("toISOString should strip millis with false param", function() {
			const date=new Date(),
				encoded=toISOString(date, false);
			assert.ok(encoded.search(/\.\d+Z$/)<0);
		});

		it("toISOString should leave millis with true milli param", function() {
			const date=new Date(),
				encoded=toISOString(date, true);
			assert.ok(encoded.search(/\.\d+Z$/)> -1);
		});
	});
});
