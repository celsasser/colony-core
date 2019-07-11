/**
 * Date: 10/31/18
 * Time: 2:15 PM
 * @license MIT (see project's LICENSE file)
 *
 * @module colony-core
 */

const storage={
	compare: null,
	date: null,
	diagnostics: null,
	enum: null,
	error: null,
	format: null,
	mutation: null,
	promise: null,
	template: null,
	type: null,
	validator: null
};

module.exports={
	/**
	 * @type {module:colony-core/compare}
	 */
	get compare() {
		return storage.compare || (storage.compare=require("./compare"));
	},
	/**
	 * @type {module:colony-core/date}
	 */
	get date() {
		return storage.date || (storage.date=require("./date"));
	},
	/**
	 * @type {module:colony-core/diagnostics}
	 */
	get diagnostics() {
		return storage.diagnostics || (storage.diagnostics=require("./diagnostics"));
	},
	/**
	 * @type {module:colony-core/enum}
	 */
	get enum() {
		return storage.enum || (storage.enum=require("./enum"));
	},
	/**
	 * @type {module:colony-core/error}
	 */
	get error() {
		return storage.error || (storage.error=require("./error"));
	},
	/**
	 * @type {module:colony-core/format}
	 */
	get format() {
		return storage.format || (storage.format=require("./format"));
	},
	/**
	 * @type {module:colony-core/mutation}
	 */
	get mutation() {
		return storage.mutation || (storage.mutation=require("./mutation"));
	},
	/**
	 * @type {module:colony-core/promise}
	 */
	get promise() {
		return storage.promise || (storage.promise=require("./promise"));
	},
	/**
	 * @type {module:colony-core/template}
	 */
	get template() {
		return storage.template || (storage.template=require("./template"));
	},
	/**
	 * @type {module:colony-core/type}
	 */
	get type() {
		return storage.type || (storage.type=require("./type"));
	}
};
