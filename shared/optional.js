"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalToResult = exports.mapOptional = exports.maybe = exports.mapv = exports.bind = exports.isNone = exports.isSome = exports.makeNone = exports.makeSome = void 0;
var list_1 = require("./list");
var result_1 = require("./result");
var makeSome = function (value) { return ({
    tag: "Some",
    value: value,
}); };
exports.makeSome = makeSome;
var makeNone = function () { return ({ tag: "None" }); };
exports.makeNone = makeNone;
var isSome = function (o) { return o.tag === "Some"; };
exports.isSome = isSome;
var isNone = function (o) { return o.tag === "None"; };
exports.isNone = isNone;
var bind = function (o, f) { return ((0, exports.isSome)(o) ? f(o.value) : o); };
exports.bind = bind;
var mapv = function (o, f) {
    return (0, exports.isSome)(o) ? (0, exports.makeSome)(f(o.value)) : o;
};
exports.mapv = mapv;
var maybe = function (o, ifSome, ifNone) { return ((0, exports.isSome)(o) ? ifSome(o.value) : ifNone()); };
exports.maybe = maybe;
var mapOptional = function (f, list) {
    return (0, list_1.isNonEmptyList)(list) ? (0, exports.bind)(f((0, list_1.first)(list)), function (fa) {
        return (0, exports.bind)((0, exports.mapOptional)(f, (0, list_1.rest)(list)), function (fas) {
            return (0, exports.makeSome)((0, list_1.cons)(fa, fas));
        });
    })
        : (0, exports.makeSome)([]);
};
exports.mapOptional = mapOptional;
var optionalToResult = function (o, message) {
    return (0, exports.maybe)(o, function (value) { return (0, result_1.makeOk)(value); }, function () { return (0, result_1.makeFailure)(message); });
};
exports.optionalToResult = optionalToResult;
