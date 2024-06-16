"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var L3_ast_1 = require("../L3/L3-ast");
var result_1 = require("../shared/result");
var parser_1 = require("../shared/parser");
describe('Q2A Tests', function () {
    it('test parse/unparse class', function () {
        (0, chai_1.expect)((0, result_1.bind)((0, result_1.bind)((0, parser_1.parse)("\n          (class (a b) \n            ((first (lambda () a)) \n             (second (lambda () b)) \n             (sum (lambda () (+ a b)))))"), L3_ast_1.parseL3Exp), function (x) { return (0, result_1.makeOk)((0, L3_ast_1.unparseL3)(x)); })).to.deep.equal((0, result_1.makeOk)("(class (a b) ((first (lambda () a)) (second (lambda () b)) (sum (lambda () (+ a b)))))"));
    });
    it('test parse wrong class', function () {
        (0, chai_1.expect)((0, result_1.bind)((0, parser_1.parse)("(class ((first (lambda () a)) (second (lambda () b)) (sum (lambda () (+ a b)))))"), L3_ast_1.parseL3Exp)).is.satisfy(result_1.isFailure);
    });
    it('test parse/unparse program', function () {
        (0, chai_1.expect)((0, result_1.bind)((0, L3_ast_1.parseL3)("(L3 (define pair (class (a b) ((first (lambda () a)) (second (lambda () b)) (sum (lambda () (+ a b)))))) (let ((p12 (pair 1 2)) (p34 (pair 3 4))) (if (> (p12 'first) (p34 'second)) #t #f)))"), function (x) { return (0, result_1.makeOk)((0, L3_ast_1.unparseL3)(x)); })).to.deep.equal((0, result_1.makeOk)("(L3 (define pair (class (a b) ((first (lambda () a)) (second (lambda () b)) (sum (lambda () (+ a b)))))) (let ((p12 (pair 1 2)) (p34 (pair 3 4))) (if (> (p12 'first) (p34 'second)) #t #f)))"));
    });
});
