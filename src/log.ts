/**
 * Date: 2019-07-12
 * Time: 21:26
 * @license MIT (see project's LICENSE file)
 *
 */
import {
	Severity,
	testSeverity
} from "./enum";

import * as _ from "lodash";
const immutable = require("./mutation").immutable;


export type LogEntryMetadata = {
	applicationId:string,
	environmentId:string,
	metadata?:{[index:string]:any},
	moduleId:string,
	severity:Severity,
	timestamp:Date
};

type Message = string|(() => string);


/**
 * This is only a base class implementation. The finer details of how logging is implemented will differ per
 * platform. The idea is that this class encapsulates the broad strokes. There will be override points and
 * they will clearly be labelled
 */
abstract class LogBase {
	public readonly applicationId:string;
	public readonly environmentId:string;
	public readonly sortMetadata:boolean;
	public readonly threshold:Severity;

	/**
	 * @param {string} applicationId
	 * @param {string} environmentId
	 * @param {boolean} sortMetadata - whether to sort the properties of metadata or not
	 * @param {ColonySeverity} threshold - if included then messages will be filtered locally by this threshold. If not then no local filtering will be applied.
	 */
	constructor({
		applicationId,
		environmentId,
		sortMetadata = true,
		threshold = undefined
	}) {
		this.applicationId = applicationId;
		this.environmentId = environmentId;
		this.sortMetadata = sortMetadata;
		this.threshold = threshold;
	}

	/********************* Public Interface *********************/
	/**
	 * @param {string|function():string} message
	 * @param {Object|undefined} metadata
	 * @param {string} moduleId
	 * @param {string|undefined} traceId
	 */
	debug(message:Message, {
		metadata = undefined,
		moduleId,
		traceId = undefined
	}) {
		this._processEntry(message, {
			metadata,
			moduleId,
			severity: Severity.DEBUG,
			traceId
		});
	}

	/**
	 * @param {string|function():string} message
	 * @param {Object|undefined} metadata
	 * @param {string} moduleId
	 * @param {string|undefined} traceId
	 */
	error(message:Message, {
		metadata = undefined,
		moduleId,
		traceId = undefined
	}) {
		this._processEntry(message, {
			metadata,
			moduleId,
			severity: Severity.ERROR,
			traceId
		});
	}

	/**
	 * @param {string|function():string} message
	 * @param {Object|undefined} metadata
	 * @param {string} moduleId
	 * @param {string|undefined} traceId
	 */
	fatal(message:Message, {
		metadata = undefined,
		moduleId,
		traceId = undefined
	}) {
		this._processEntry(message, {
			metadata,
			moduleId,
			severity: Severity.FATAL,
			traceId
		});
	}

	/**
	 * @param {string|function():string} message
	 * @param {Object|undefined} metadata
	 * @param {string} moduleId
	 * @param {string|undefined} traceId
	 */
	info(message:Message, {
		metadata = undefined,
		moduleId,
		traceId = undefined
	}) {
		this._processEntry(message, {
			metadata,
			moduleId,
			severity: Severity.INFO,
			traceId
		});
	}

	/**
	 * @param {string|function():string} message
	 * @param {Object|undefined} metadata
	 * @param {string} moduleId
	 * @param {string|undefined} traceId
	 */
	warn(message:Message, {
		metadata = undefined,
		moduleId,
		traceId = undefined
	}) {
		this._processEntry(message, {
			metadata,
			moduleId,
			severity: Severity.WARN,
			traceId
		});
	}

	/********************* Protected Interface *********************/
	/**
	 * Derived classes should implement this method
	 */
	protected abstract _logEntry(message:string, metadata:LogEntryMetadata):void;

	/********************* Private Interface *********************/
	/**
	 * @param {string|function():string} message
	 * @param {Object} metadata
	 * @param {string} moduleId
	 * @param {Severity} severity
	 * @param {string|undefined} traceId
	 * @private
	 */
	private _processEntry(message:Message, {
		metadata,
		moduleId,
		severity,
		traceId
	}) {
		if(this.threshold === undefined || testSeverity(severity, this.threshold)) {
			if(_.isFunction(message)) {
				message = message();
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

module.exports = {
	LogBase
};

