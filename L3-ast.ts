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
exports.unparseL3 = exports.unparseClassExp = exports.parseSExp = exports.makeDottedPair = exports.isDottedPair = exports.parseLitExp = exports.parseClassExp = exports.parseL3Atomic = exports.parseL3CExp = exports.parseDefine = exports.parseL3SpecialForm = exports.parseL3CompoundCExp = exports.parseL3CompoundExp = exports.parseL3Exp = exports.parseL3Program = exports.parseL3 = exports.isCExp = exports.isCompoundExp = exports.isAtomicExp = exports.isExp = exports.isClassExp = exports.isLitExp = exports.isLetExp = exports.isBinding = exports.isProcExp = exports.isIfExp = exports.isAppExp = exports.isVarDecl = exports.isVarRef = exports.isPrimOp = exports.isStrExp = exports.isBoolExp = exports.isNumExp = exports.isDefineExp = exports.isProgram = exports.makeClassExp = exports.makeLitExp = exports.makeLetExp = exports.makeBinding = exports.makeProcExp = exports.makeIfExp = exports.makeAppExp = exports.makeVarDecl = exports.makeVarRef = exports.makePrimOp = exports.makeStrExp = exports.makeBoolExp = exports.makeNumExp = exports.makeDefineExp = exports.makeProgram = void 0;
// ===========================================================
// AST type models
var ramda_1 = require("ramda");
var L3_value_1 = require("./L3-value");
var list_1 = require("../shared/list");
var type_predicates_1 = require("../shared/type-predicates");
var result_1 = require("../shared/result");
var parser_1 = require("../shared/parser");
// Type value constructors for disjoint types
var makeProgram = function (exps) { return ({ tag: "Program", exps: exps }); };
exports.makeProgram = makeProgram;
var makeDefineExp = function (v, val) {
    return ({ tag: "DefineExp", var: v, val: val });
};
exports.makeDefineExp = makeDefineExp;
var makeNumExp = function (n) { return ({ tag: "NumExp", val: n }); };
exports.makeNumExp = makeNumExp;
var makeBoolExp = function (b) { return ({ tag: "BoolExp", val: b }); };
exports.makeBoolExp = makeBoolExp;
var makeStrExp = function (s) { return ({ tag: "StrExp", val: s }); };
exports.makeStrExp = makeStrExp;
var makePrimOp = function (op) { return ({ tag: "PrimOp", op: op }); };
exports.makePrimOp = makePrimOp;
var makeVarRef = function (v) { return ({ tag: "VarRef", var: v }); };
exports.makeVarRef = makeVarRef;
var makeVarDecl = function (v) { return ({ tag: "VarDecl", var: v }); };
exports.makeVarDecl = makeVarDecl;
var makeAppExp = function (rator, rands) {
    return ({ tag: "AppExp", rator: rator, rands: rands });
};
exports.makeAppExp = makeAppExp;
// L2
var makeIfExp = function (test, then, alt) {
    return ({ tag: "IfExp", test: test, then: then, alt: alt });
};
exports.makeIfExp = makeIfExp;
var makeProcExp = function (args, body) {
    return ({ tag: "ProcExp", args: args, body: body });
};
exports.makeProcExp = makeProcExp;
var makeBinding = function (v, val) {
    return ({ tag: "Binding", var: (0, exports.makeVarDecl)(v), val: val });
};
exports.makeBinding = makeBinding;
var makeLetExp = function (bindings, body) {
    return ({ tag: "LetExp", bindings: bindings, body: body });
};
exports.makeLetExp = makeLetExp;
// L3
var makeLitExp = function (val) {
    return ({ tag: "LitExp", val: val });
};
exports.makeLitExp = makeLitExp;
//Class
var makeClassExp = function (fields, methods) {
    return ({ tag: "ClassExp", fields: fields, methods: methods });
};
exports.makeClassExp = makeClassExp;
// Type predicates for disjoint types
var isProgram = function (x) { return x.tag === "Program"; };
exports.isProgram = isProgram;
var isDefineExp = function (x) { return x.tag === "DefineExp"; };
exports.isDefineExp = isDefineExp;
var isNumExp = function (x) { return x.tag === "NumExp"; };
exports.isNumExp = isNumExp;
var isBoolExp = function (x) { return x.tag === "BoolExp"; };
exports.isBoolExp = isBoolExp;
var isStrExp = function (x) { return x.tag === "StrExp"; };
exports.isStrExp = isStrExp;
var isPrimOp = function (x) { return x.tag === "PrimOp"; };
exports.isPrimOp = isPrimOp;
var isVarRef = function (x) { return x.tag === "VarRef"; };
exports.isVarRef = isVarRef;
var isVarDecl = function (x) { return x.tag === "VarDecl"; };
exports.isVarDecl = isVarDecl;
var isAppExp = function (x) { return x.tag === "AppExp"; };
exports.isAppExp = isAppExp;
// L2
var isIfExp = function (x) { return x.tag === "IfExp"; };
exports.isIfExp = isIfExp;
var isProcExp = function (x) { return x.tag === "ProcExp"; };
exports.isProcExp = isProcExp;
var isBinding = function (x) { return x.tag === "Binding"; };
exports.isBinding = isBinding;
var isLetExp = function (x) { return x.tag === "LetExp"; };
exports.isLetExp = isLetExp;
// L3
var isLitExp = function (x) { return x.tag === "LitExp"; };
exports.isLitExp = isLitExp;
//Class
var isClassExp = function (x) { return x.tag === "ClassExp"; };
exports.isClassExp = isClassExp;
// Type predicates for type unions
var isExp = function (x) { return (0, exports.isDefineExp)(x) || (0, exports.isCExp)(x); };
exports.isExp = isExp;
var isAtomicExp = function (x) {
    return (0, exports.isNumExp)(x) || (0, exports.isBoolExp)(x) || (0, exports.isStrExp)(x) ||
        (0, exports.isPrimOp)(x) || (0, exports.isVarRef)(x);
};
exports.isAtomicExp = isAtomicExp;
var isCompoundExp = function (x) {
    return (0, exports.isAppExp)(x) || (0, exports.isIfExp)(x) || (0, exports.isProcExp)(x) || (0, exports.isLitExp)(x) || (0, exports.isLetExp)(x) || (0, exports.isClassExp)(x);
};
exports.isCompoundExp = isCompoundExp;
var isCExp = function (x) {
    return (0, exports.isAtomicExp)(x) || (0, exports.isCompoundExp)(x);
};
exports.isCExp = isCExp;
// ========================================================
// Parsing
var parseL3 = function (x) {
    return (0, result_1.bind)((0, parser_1.parse)(x), exports.parseL3Program);
};
exports.parseL3 = parseL3;
var parseL3Program = function (sexp) {
    return sexp === "" || (0, list_1.isEmpty)(sexp) ? (0, result_1.makeFailure)("Unexpected empty program") :
        (0, parser_1.isToken)(sexp) ? (0, result_1.makeFailure)("Program cannot be a single token: ".concat((0, format_1.format)(sexp))) :
            (0, list_1.isNonEmptyList)(sexp) ? parseL3GoodProgram((0, list_1.first)(sexp), (0, list_1.rest)(sexp)) :
                (0, result_1.makeFailure)("Unexpected type ".concat((0, format_1.format)(sexp)));
};
exports.parseL3Program = parseL3Program;
var parseL3GoodProgram = function (keyword, body) {
    return keyword === "L3" && !(0, list_1.isEmpty)(body) ? (0, result_1.mapv)((0, result_1.mapResult)(exports.parseL3Exp, body), function (exps) {
        return (0, exports.makeProgram)(exps);
    }) :
        (0, result_1.makeFailure)("Program must be of the form (L3 <exp>+): ".concat((0, format_1.format)(__spreadArray([keyword], body, true))));
};
// Exp -> <DefineExp> | <Cexp>
var parseL3Exp = function (sexp) {
    return (0, parser_1.isCompoundSexp)(sexp) ?
        (0, list_1.isNonEmptyList)(sexp) ? (0, exports.parseL3CompoundExp)((0, list_1.first)(sexp), (0, list_1.rest)(sexp)) :
            (0, result_1.makeFailure)("Exp cannot be an empty list: ".concat((0, format_1.format)(sexp))) :
        (0, parser_1.isToken)(sexp) ? (0, exports.parseL3Atomic)(sexp) :
            (0, result_1.makeFailure)("Bad param: ".concat(sexp));
};
exports.parseL3Exp = parseL3Exp;
// Compound -> DefineExp | CompoundCExp
var parseL3CompoundExp = function (op, params) {
    return op === "define" ? (0, exports.parseDefine)(params) :
        (0, exports.parseL3CompoundCExp)(op, params);
};
exports.parseL3CompoundExp = parseL3CompoundExp;
// CompoundCExp -> IfExp | ProcExp | LetExp | LitExp | AppExp | ClassExp
var parseL3CompoundCExp = function (op, params) {
    return (0, type_predicates_1.isString)(op) && isSpecialForm(op) ? (0, exports.parseL3SpecialForm)(op, params) :
        parseAppExp(op, params);
};
exports.parseL3CompoundCExp = parseL3CompoundCExp;
var parseL3SpecialForm = function (op, params) {
    return (0, list_1.isEmpty)(params) ? (0, result_1.makeFailure)("Empty args for special form") :
        op === "if" ? parseIfExp(params) :
            op === "lambda" ?
                (0, list_1.isNonEmptyList)(params) ? parseProcExp((0, list_1.first)(params), (0, list_1.rest)(params)) :
                    (0, result_1.makeFailure)("Bad proc: ".concat(params)) :
                op === "let" ?
                    (0, list_1.isNonEmptyList)(params) ? parseLetExp((0, list_1.first)(params), (0, list_1.rest)(params)) :
                        (0, result_1.makeFailure)("Bad let: ".concat(params)) :
                    op === "quote" ?
                        (0, list_1.isNonEmptyList)(params) ? (0, exports.parseLitExp)((0, list_1.first)(params)) :
                            (0, result_1.makeFailure)("Bad quote exp: ".concat(params)) :
                        op === "class" ?
                            (0, list_1.isNonEmptyList)(params) ? (0, exports.parseClassExp)((0, list_1.first)(params), (0, list_1.rest)(params)) :
                                (0, result_1.makeFailure)("Bad quote exp: ".concat(params)) :
                            (0, result_1.makeFailure)("Never");
};
exports.parseL3SpecialForm = parseL3SpecialForm;
// DefineExp -> (define <varDecl> <CExp>)
var parseDefine = function (params) {
    return (0, list_1.isNonEmptyList)(params) ?
        (0, list_1.isEmpty)((0, list_1.rest)(params)) ? (0, result_1.makeFailure)("define missing 1 arguments: ".concat((0, format_1.format)(params))) :
            (params.length > 2) ? (0, result_1.makeFailure)("define too many arguments: ".concat((0, format_1.format)(params))) :
                parseGoodDefine((0, list_1.first)(params), (0, list_1.second)(params)) :
        (0, result_1.makeFailure)("define missing 2 arguments");
};
exports.parseDefine = parseDefine;
var parseGoodDefine = function (variable, val) {
    return !(0, type_predicates_1.isIdentifier)(variable) ? (0, result_1.makeFailure)("First arg of define must be an identifier: ".concat((0, format_1.format)(variable))) :
        (0, result_1.mapv)((0, exports.parseL3CExp)(val), function (value) {
            return (0, exports.makeDefineExp)((0, exports.makeVarDecl)(variable), value);
        });
};
var parseL3CExp = function (sexp) {
    return (0, parser_1.isCompoundSexp)(sexp) ?
        (0, list_1.isNonEmptyList)(sexp) ? (0, exports.parseL3CompoundCExp)((0, list_1.first)(sexp), (0, list_1.rest)(sexp)) :
            (0, result_1.makeFailure)("CExp cannot be an empty list") :
        (0, parser_1.isToken)(sexp) ? (0, exports.parseL3Atomic)(sexp) :
            (0, result_1.makeFailure)("Bad sexp: ".concat(sexp));
};
exports.parseL3CExp = parseL3CExp;
// Atomic -> number | boolean | primitiveOp | string
var parseL3Atomic = function (token) {
    return token === "#t" ? (0, result_1.makeOk)((0, exports.makeBoolExp)(true)) :
        token === "#f" ? (0, result_1.makeOk)((0, exports.makeBoolExp)(false)) :
            (0, type_predicates_1.isString)(token) && (0, type_predicates_1.isNumericString)(token) ? (0, result_1.makeOk)((0, exports.makeNumExp)(+token)) :
                (0, type_predicates_1.isString)(token) && isPrimitiveOp(token) ? (0, result_1.makeOk)((0, exports.makePrimOp)(token)) :
                    (0, type_predicates_1.isString)(token) ? (0, result_1.makeOk)((0, exports.makeVarRef)(token)) :
                        (0, result_1.makeOk)((0, exports.makeStrExp)(token.toString()));
};
exports.parseL3Atomic = parseL3Atomic;
/*
    ;; <prim-op>  ::= + | - | * | / | < | > | = | not | and | or | eq? | string=?
    ;;                  | cons | car | cdr | pair? | number? | list
    ;;                  | boolean? | symbol? | string?      ##### L3
*/
var isPrimitiveOp = function (x) {
    return ["+", "-", "*", "/", ">", "<", "=", "not", "and", "or",
        "eq?", "string=?", "cons", "car", "cdr", "list", "pair?",
        "number?", "boolean?", "symbol?", "string?"].includes(x);
};
var isSpecialForm = function (x) {
    return ["if", "lambda", "let", "quote", "class"].includes(x);
};
var parseAppExp = function (op, params) {
    return (0, result_1.bind)((0, exports.parseL3CExp)(op), function (rator) {
        return (0, result_1.mapv)((0, result_1.mapResult)(exports.parseL3CExp, params), function (rands) {
            return (0, exports.makeAppExp)(rator, rands);
        });
    });
};
var parseClassExp = function (fields, methods) {
    return (0, type_predicates_1.isArray)(fields) && (0, list_1.allT)(type_predicates_1.isString, fields) && isGoodBindings(methods) ?
        (0, result_1.mapv)((0, result_1.mapv)((0, result_1.mapResult)(exports.parseL3CExp, (0, ramda_1.map)(list_1.second, methods)), function (vals) { return (0, ramda_1.zipWith)(exports.makeBinding, (0, ramda_1.map)(function (b) { return b[0]; }, methods), vals); }), function (bindings) {
            return (0, exports.makeClassExp)((0, ramda_1.map)(exports.makeVarDecl, fields), bindings);
        }) :
        (0, result_1.makeFailure)("Invalid vars for ProcExp ".concat((0, format_1.format)(fields)));
};
exports.parseClassExp = parseClassExp;
var parseIfExp = function (params) {
    return params.length !== 3 ? (0, result_1.makeFailure)("Expression not of the form (if <cexp> <cexp> <cexp>): ".concat((0, format_1.format)(params))) :
        (0, result_1.mapv)((0, result_1.mapResult)(exports.parseL3CExp, params), function (cexps) {
            return (0, exports.makeIfExp)(cexps[0], cexps[1], cexps[2]);
        });
};
var parseProcExp = function (vars, body) {
    return (0, type_predicates_1.isArray)(vars) && (0, list_1.allT)(type_predicates_1.isString, vars) ? (0, result_1.mapv)((0, result_1.mapResult)(exports.parseL3CExp, body), function (cexps) {
        return (0, exports.makeProcExp)((0, ramda_1.map)(exports.makeVarDecl, vars), cexps);
    }) :
        (0, result_1.makeFailure)("Invalid vars for ProcExp ".concat((0, format_1.format)(vars)));
};
var isGoodBindings = function (bindings) {
    return (0, type_predicates_1.isArray)(bindings) &&
        (0, list_1.allT)((list_1.isNonEmptyList), bindings) &&
        (0, list_1.allT)(type_predicates_1.isIdentifier, (0, ramda_1.map)(list_1.first, bindings));
};
var parseLetExp = function (bindings, body) {
    if (!isGoodBindings(bindings)) {
        return (0, result_1.makeFailure)('Malformed bindings in "let" expression');
    }
    // Given (letrec ( (var <val>) ...) <cexp> ...)
    // Return makeLetExp( [makeBinding(var, parse(<val>)) ...], [ parse(<cexp>) ...] )
    // After isGoodBindings, bindings has type [string, Sexp][]
    var vars = (0, ramda_1.map)(function (b) { return b[0]; }, bindings);
    var valsResult = (0, result_1.mapResult)(exports.parseL3CExp, (0, ramda_1.map)(list_1.second, bindings));
    var bindingsResult = (0, result_1.mapv)(valsResult, function (vals) { return (0, ramda_1.zipWith)(exports.makeBinding, vars, vals); });
    return (0, result_1.bind)(bindingsResult, function (bindings) {
        return (0, result_1.mapv)((0, result_1.mapResult)(exports.parseL3CExp, body), function (body) {
            return (0, exports.makeLetExp)(bindings, body);
        });
    });
};
// sexps has the shape (quote <sexp>)
var parseLitExp = function (param) {
    return (0, result_1.mapv)((0, exports.parseSExp)(param), function (sexp) {
        return (0, exports.makeLitExp)(sexp);
    });
};
exports.parseLitExp = parseLitExp;
var isDottedPair = function (sexps) {
    return sexps.length === 3 &&
        sexps[1] === ".";
};
exports.isDottedPair = isDottedPair;
var makeDottedPair = function (sexps) {
    return (0, result_1.bind)((0, exports.parseSExp)(sexps[0]), function (val1) {
        return (0, result_1.mapv)((0, exports.parseSExp)(sexps[2]), function (val2) {
            return (0, L3_value_1.makeCompoundSExp)(val1, val2);
        });
    });
};
exports.makeDottedPair = makeDottedPair;
// x is the output of p (sexp parser)
var parseSExp = function (sexp) {
    return sexp === "#t" ? (0, result_1.makeOk)(true) :
        sexp === "#f" ? (0, result_1.makeOk)(false) :
            (0, type_predicates_1.isString)(sexp) && (0, type_predicates_1.isNumericString)(sexp) ? (0, result_1.makeOk)(+sexp) :
                (0, parser_1.isSexpString)(sexp) ? (0, result_1.makeOk)(sexp.toString()) :
                    (0, type_predicates_1.isString)(sexp) ? (0, result_1.makeOk)((0, L3_value_1.makeSymbolSExp)(sexp)) :
                        sexp.length === 0 ? (0, result_1.makeOk)((0, L3_value_1.makeEmptySExp)()) :
                            (0, exports.isDottedPair)(sexp) ? (0, exports.makeDottedPair)(sexp) :
                                (0, list_1.isNonEmptyList)(sexp) ? (
                                // fail on (x . y z)
                                (0, list_1.first)(sexp) === '.' ? (0, result_1.makeFailure)("Bad dotted sexp: ".concat((0, format_1.format)(sexp))) :
                                    (0, result_1.bind)((0, exports.parseSExp)((0, list_1.first)(sexp)), function (val1) {
                                        return (0, result_1.mapv)((0, exports.parseSExp)((0, list_1.rest)(sexp)), function (val2) {
                                            return (0, L3_value_1.makeCompoundSExp)(val1, val2);
                                        });
                                    })) :
                                    (0, result_1.makeFailure)("Bad sexp: ".concat(sexp));
};
exports.parseSExp = parseSExp;
// ==========================================================================
// Unparse: Map an AST to a concrete syntax string.
var L3_value_2 = require("./L3-value");
var format_1 = require("../shared/format");
// Add a quote for symbols, empty and compound sexp - strings and numbers are not quoted.
var unparseLitExp = function (le) {
    return (0, L3_value_2.isEmptySExp)(le.val) ? "'()" :
        (0, L3_value_2.isSymbolSExp)(le.val) ? "'".concat((0, L3_value_1.valueToString)(le.val)) :
            (0, L3_value_2.isCompoundSExp)(le.val) ? "'".concat((0, L3_value_1.valueToString)(le.val)) :
                "".concat(le.val);
};
var unparseLExps = function (les) {
    return (0, ramda_1.map)(exports.unparseL3, les).join(" ");
};
var unparseProcExp = function (pe) {
    return "(lambda (".concat((0, ramda_1.map)(function (p) { return p.var; }, pe.args).join(" "), ") ").concat(unparseLExps(pe.body), ")");
};
var unparseLetExp = function (le) {
    return "(let (".concat((0, ramda_1.map)(function (b) { return "(".concat(b.var.var, " ").concat((0, exports.unparseL3)(b.val), ")"); }, le.bindings).join(" "), ") ").concat(unparseLExps(le.body), ")");
};
var unparseClassExp = function (ce) {
    return "(class (".concat((0, ramda_1.map)(function (v) { return "(".concat(v.var, ")"); }, ce.fields).join(" "), ") \n(").concat((0, ramda_1.map)(function (b) { return "(".concat(b.var.var, " ").concat((0, exports.unparseL3)(b.val), ")"); }, ce.methods).join(" "), ")");
};
exports.unparseClassExp = unparseClassExp;
var unparseL3 = function (exp) {
    return (0, exports.isBoolExp)(exp) ? (0, L3_value_1.valueToString)(exp.val) :
        (0, exports.isNumExp)(exp) ? (0, L3_value_1.valueToString)(exp.val) :
            (0, exports.isStrExp)(exp) ? (0, L3_value_1.valueToString)(exp.val) :
                (0, exports.isLitExp)(exp) ? unparseLitExp(exp) :
                    (0, exports.isVarRef)(exp) ? exp.var :
                        (0, exports.isProcExp)(exp) ? unparseProcExp(exp) :
                            (0, exports.isIfExp)(exp) ? "(if ".concat((0, exports.unparseL3)(exp.test), " ").concat((0, exports.unparseL3)(exp.then), " ").concat((0, exports.unparseL3)(exp.alt), ")") :
                                (0, exports.isAppExp)(exp) ? "(".concat((0, exports.unparseL3)(exp.rator), " ").concat(unparseLExps(exp.rands), ")") :
                                    (0, exports.isPrimOp)(exp) ? exp.op :
                                        (0, exports.isLetExp)(exp) ? unparseLetExp(exp) :
                                            (0, exports.isDefineExp)(exp) ? "(define ".concat(exp.var.var, " ").concat((0, exports.unparseL3)(exp.val), ")") :
                                                (0, exports.isProgram)(exp) ? "(L3 ".concat(unparseLExps(exp.exps), ")") :
                                                    (0, exports.isClassExp)(exp) ? (0, exports.unparseClassExp)(exp) :
                                                        exp;
};
exports.unparseL3 = unparseL3;
