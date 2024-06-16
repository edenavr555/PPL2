"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIdentifier = exports.isNumericString = exports.isError = exports.isBoolean = exports.isNumber = exports.isString = exports.isArray = void 0;
// ========================================================
// Type utilities
exports.isArray = Array.isArray;
var isString = function (x) { return typeof x === "string"; };
exports.isString = isString;
var isNumber = function (x) { return typeof x === "number"; };
exports.isNumber = isNumber;
var isBoolean = function (x) { return typeof x === "boolean"; };
exports.isBoolean = isBoolean;
var isError = function (x) { return x instanceof Error; };
exports.isError = isError;
// Check that a string encodes a number (also works for -3.0)
// Uses the same conventions as JavaScript - covers octal, hexadecimal, decimal, float
// '0xAB', '0o77' '-1.0e-12' are all valid numbers
var isNumericString = function (x) {
    return ((x != null) &&
        (x !== '') &&
        !isNaN(Number(x)));
};
exports.isNumericString = isNumericString;
var isIdentifier = function (x) {
    return /^[A-Za-z][A-Za-z0-9]*/i.test(x);
};
exports.isIdentifier = isIdentifier;
