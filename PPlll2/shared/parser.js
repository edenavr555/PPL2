"use strict";
/// <reference path="s-expression.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.isCompoundSexp = exports.isSexp = exports.isToken = exports.isSexpString = void 0;
var s_expression_1 = require("s-expression");
var result_1 = require("./result");
var type_predicates_1 = require("./type-predicates");
var list_1 = require("./list");
// s-expression returns strings quoted as "a" as [String: 'a'] objects
// to distinguish them from symbols - which are encoded as 'a'
// These are constructed using the new String("a") constructor
// and can be distinguished from regular strings based on the constructor.
var isSexpString = function (x) {
    return !(0, type_predicates_1.isString)(x) && x.constructor && x.constructor.name === "String";
};
exports.isSexpString = isSexpString;
var isToken = function (x) { return (0, type_predicates_1.isString)(x) || (0, exports.isSexpString)(x); };
exports.isToken = isToken;
var isSexp = function (x) { return (0, exports.isToken)(x) || (0, exports.isCompoundSexp)(x); };
exports.isSexp = isSexp;
var isCompoundSexp = function (x) {
    return (0, type_predicates_1.isArray)(x) && (0, list_1.allT)(exports.isSexp, x);
};
exports.isCompoundSexp = isCompoundSexp;
var parse = function (x) {
    var parsed = (0, s_expression_1.default)(x);
    return (0, type_predicates_1.isError)(parsed) ? (0, result_1.makeFailure)(parsed.message) : (0, result_1.makeOk)(parsed);
};
exports.parse = parse;
