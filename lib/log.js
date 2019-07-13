/**
 * Date: 2019-07-12
 * Time: 21:26
 * @license MIT (see project's LICENSE file)
 *
 * @module colony-core/log
 */

const _=require("lodash");
const {
	enum: severityEnum,
	trips: severityTrips
}=require("./enum/severity");
const immutable=require("./mutation").immutable;


/**
 * This is only a base class implementation. The finer details of how logging is implemented will differ per
 * platform. The idea is that this class encapsulates the broad strokes. There will be override points and
 * they will clearly be labelled
 */
class LogBase {
	/**
	 * @param {string} applicationId
	 * @param {string} environmentId
	 * @param {boolean} sortMetadata - whether to sort the properties of metadata or not
	 * @param {ColonySeverity} threshold - if included then messages will be filtered locally by this threshold. If not then no local filtering will be applied.
	 */
	constructor({
		applicationId,
		environmentId,
		sortMetadata=true,
		threshold=undefined
	}) {
		this.applicationId=applicationId;
		this.environmentId=environmentId;
		this.sortMetadata=sortMetadata;
		this.threshold=threshold;
	}

	/********************* Public Interface *********************/
	/**
	 * @param {string|function():string} message
	 * @param {Object|undefined} metadata
	 * @param {string} moduleId
	 * @param {string|undefined} traceId
	 */
	debug(message, {
		metadata=undefined,
		moduleId,
		traceId=undefined
	}) {
		this._processEntry(message, {
			metadata,
			moduleId,
			severity: severityEnum.DEBUG,
			traceId
		});
	}

	/**
	 * @param {string|function():string} message
	 * @param {Object|undefined} metadata
	 * @param {string} moduleId
	 * @param {string|undefined} traceId
	 */
	error(message, {
		metadata=undefined,
		moduleId,
		traceId=undefined
	}) {
		this._processEntry(message, {
			metadata,
			moduleId,
			severity: severityEnum.ERROR,
			traceId
		});
	}

	/**
	 * @param {string|function():string} message
	 * @param {Object|undefined} metadata
	 * @param {string} moduleId
	 * @param {string|undefined} traceId
	 */
	fatal(message, {
		metadata=undefined,
		moduleId,
		traceId=undefined
	}) {
		this._processEntry(message, {
			metadata,
			moduleId,
			severity: severityEnum.FATAL,
			traceId
		});
	}

	/**
	 * @param {string|function():string} message
	 * @param {Object|undefined} metadata
	 * @param {string} moduleId
	 * @param {string|undefined} traceId
	 */
	info(message, {
		metadata=undefined,
		moduleId,
		traceId=undefined
	}) {
		this._processEntry(message, {
			metadata,
			moduleId,
			severity: severityEnum.INFO,
			traceId
		});
	}

	/**
	 * @param {string|function():string} message
	 * @param {Object|undefined} metadata
	 * @param {string} moduleId
	 * @param {string|undefined} traceId
	 */
	warn(message, {
		metadata=undefined,
		moduleId,
		traceId=undefined
	}) {
		this._processEntry(message, {
			metadata,
			moduleId,
			severity: severityEnum.WARN,
			traceId
		});
	}

	/********************* Protected Interface *********************/
	/**
	 * Derived classes should implement this method
	 * @param {string} message
	 * @param {LogEntryMetadata} metadata
	 * @protected
	 * @override
	 */
	_logEntry(message, metadata) {

	}

	/********************* Private Interface *********************/
	/**
	 * @param {string|function():string} message
	 * @param {Object} metadata
	 * @param {string} moduleId
	 * @param {ColonySeverity} severity
	 * @param {string|undefined} traceId
	 * @private
	 */
	_processEntry(message, {
		metadata,
		moduleId,
		severity,
		traceId
	}) {
		if(this.threshold===undefined || severityTrips(severity, this.threshold)) {
			if(_.isFunction(message)) {
				message=message();
			}
			this._logEntry(message, _.omitBy({
				applicationId: this.applicationId,
				environmentId: this.environmentId,
				metadata: (this.sortMetadata)
					? immutable.object.sort(metadata)
					: metadata,
				moduleId,
				severity,
				timestamp: new Date(),
				traceId
			}, _.isUndefined));
		}
	}
}

module.exports={
	LogBase
};
