"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allT = exports.isEmpty = exports.isNonEmptyList = exports.rest = exports.second = exports.first = exports.cons = void 0;
// List operations similar to car/cdr/cadr in Scheme
var ramda_1 = require("ramda");
var cons = function (x, xs) { return __spreadArray([x], xs, true); };
exports.cons = cons;
var first = function (_a) {
    var x = _a[0], _xs = _a.slice(1);
    return x;
};
exports.first = first;
var second = function (_a) {
    var _x0 = _a[0], x1 = _a[1], _xs = _a.slice(2);
    return x1;
};
exports.second = second;
var rest = function (_a) {
    var _ = _a[0], xs = _a.slice(1);
    return xs;
};
exports.rest = rest;
var isNonEmptyList = function (xs) {
    return Array.isArray(xs) && xs.length > 0;
};
exports.isNonEmptyList = isNonEmptyList;
var isEmpty = function (xs) {
    return Array.isArray(xs) && !(0, exports.isNonEmptyList)(xs);
};
exports.isEmpty = isEmpty;
// A useful type predicate for homogeneous lists
var allT = function (isT, x) {
    return (0, ramda_1.all)(isT, x);
};
exports.allT = allT;
