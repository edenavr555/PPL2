"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultToOptional = exports.safe2 = exports.zipWithResult = exports.mapResult = exports.isOkT = exports.either = exports.rmap = exports.rbind = exports.mapv = exports.bind = exports.isFailure = exports.isOk = exports.makeFailure = exports.makeOk = void 0;
var list_1 = require("./list");
var optional_1 = require("./optional");
var makeOk = function (value) { return ({ tag: "Ok", value: value }); };
exports.makeOk = makeOk;
var makeFailure = function (message) { return ({
    tag: "Failure",
    message: message,
}); };
exports.makeFailure = makeFailure;
var isOk = function (r) { return r.tag === "Ok"; };
exports.isOk = isOk;
var isFailure = function (r) { return r.tag === "Failure"; };
exports.isFailure = isFailure;
// bind a result value into a happy path function that could fail (f is a diagonal operator)
var bind = function (r, f) {
    return (0, exports.isOk)(r) ? f(r.value) : r;
};
exports.bind = bind;
// bind a result value into a happy path function that does not fail (f is a horizontal operator)
var mapv = function (r, f) {
    return (0, exports.isOk)(r) ? (0, exports.makeOk)(f(r.value)) : r;
};
exports.mapv = mapv;
// Traditional Result.bind(f) from diagonal T->R<U> to lifted R<T>->R<U>
// Also known as flatmap
var rbind = function (f) {
    return function (r) {
        return (0, exports.isOk)(r) ? f(r.value) : r;
    };
};
exports.rbind = rbind;
// Traditional Result.map(f) from horizontal T->U to lifted R<T>->R<U>
var rmap = function (f) {
    return function (r) {
        return (0, exports.isOk)(r) ? (0, exports.makeOk)(f(r.value)) : r;
    };
};
exports.rmap = rmap;
// Traditionally called Result.fold(result, onOk, onFailure)
var either = function (r, ifOk, ifFailure) { return ((0, exports.isOk)(r) ? ifOk(r.value) : ifFailure(r.message)); };
exports.either = either;
// Purpose: Test whether a result is Ok and of a
//          specified type (using a given type predicate)
// Example:
//     const r: Result<Exp> = bind(p("(+ x 1)"), parseL3Exp);
//     isOkT(isAppExp)(r) ? [here "r" is Ok<AppExp>]
var isOkT = function (pred) {
    return function (r) {
        return (0, exports.isOk)(r) && pred(r.value);
    };
};
exports.isOkT = isOkT;
// Purpose: Like map on an array - but with a diagonal transformer operator (returns a Result<T>)
//          With f: T=>Result<U> and list: List<T> return a Result<List<U>>
//          If one of the items of the list fails on f - returns the Failure on the first item that fails.
// Example:
// mapResult((x) => x === 0 ? makeFailure("div by 0") : makeOk(1/x), [1,2]) ==> {tag:"Ok", value:[1, 0.5]}
// mapResult((x) => x === 0 ? makeFailure("div by 0") : makeOk(1/x), [1,0,2]) ==> {tag:"Failure", message:"div by 0"}
var mapResult = function (f, list) {
    return (0, list_1.isNonEmptyList)(list) ? (0, exports.bind)(f((0, list_1.first)(list)), function (fa) { return (0, exports.bind)((0, exports.mapResult)(f, (0, list_1.rest)(list)), function (fas) { return (0, exports.makeOk)((0, list_1.cons)(fa, fas)); }); })
        : (0, exports.makeOk)([]);
};
exports.mapResult = mapResult;
var zipWithResult = function (f, xs, ys) {
    return (0, list_1.isNonEmptyList)(xs) &&
        (0, list_1.isNonEmptyList)(ys) ? (0, exports.bind)(f((0, list_1.first)(xs), (0, list_1.first)(ys)), function (fxy) { return (0, exports.bind)((0, exports.zipWithResult)(f, (0, list_1.rest)(xs), (0, list_1.rest)(ys)), function (fxys) { return (0, exports.makeOk)((0, list_1.cons)(fxy, fxys)); }); })
        : (0, exports.makeOk)([]);
};
exports.zipWithResult = zipWithResult;
var safe2 = function (f) {
    return function (xr, yr) {
        return (0, exports.bind)(xr, function (x) { return (0, exports.bind)(yr, function (y) { return f(x, y); }); });
    };
};
exports.safe2 = safe2;
var resultToOptional = function (r) {
    return (0, exports.either)(r, optional_1.makeSome, function (_) { return (0, optional_1.makeNone)(); });
};
exports.resultToOptional = resultToOptional;
