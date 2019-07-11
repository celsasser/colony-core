/**
 * Date: 05/27/18
 * Time: 7:15 PM
 */

const assert=require("../support/assert");
const {
	addDays,
	addHours,
	addMillis,
	addMinutes,
	addSeconds,
	fromString,
	fromValue,
	isEqual,
	toISOString
}=require("../../lib/date");


describe("date", function() {
	it("addMillis should properly add 10 millis to current date", function() {
		const date=new Date();
		assert.strictEqual(addMillis(date, 10).getTime(), new Date(date.getTime()+10).getTime());
	});

	it("addSeconds should properly add 10 seconds to current date", function() {
		const date=new Date();
		assert.strictEqual(addSeconds(date, 10).getTime(), new Date(date.getTime()+10*1000).getTime());
	});

	it("addMinutes should properly add 10 minutes to current date", function() {
		const date=new Date();
		assert.strictEqual(addMinutes(date, 10).getTime(), new Date(date.getTime()+10*60*1000).getTime());
	});

	it("addHours should properly add 10 hourse to current date", function() {
		const date=new Date();
		assert.strictEqual(addHours(date, 10).getTime(), new Date(date.getTime()+10*60*60*1000).getTime());
	});

	it("addDays should properly add 10 days to current date", function() {
		const date=new Date();
		assert.strictEqual(addDays(date, 10).getTime(), new Date(date.getTime()+10*24*60*60*1000).getTime());
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
