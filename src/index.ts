/**
 * Date: 10/31/18
 * Time: 2:15 PM
 * @license MIT (see project's LICENSE file)
 */

import * as _compare from "./compare";
import * as _date from "./date";
import * as _diagnostics from "./diagnostics";
import * as _format from "./format";
import * as _promise from "./promise";
import * as _template from "./template";
import * as _type from "./type";

/**
 * We will assume global scope (to the core) for enums
 */
export * from "./enum";
/**
 * We will assume global scope for all errors
 */
export * from "./error";
/**
 * We want mutable and immutable to be accessible directly
 */
export * from "./mutation";

export const compare = _compare;
export const date = _date;
export const diagnostics = _diagnostics;
export const format = _format;
export const promise = _promise;
export const template = _template;
export const type = _type;
