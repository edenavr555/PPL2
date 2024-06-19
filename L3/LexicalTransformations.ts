import { map, zipWith } from "ramda";
import { ClassExp, ProcExp, Exp, CExp, Program, VarDecl, makeProcExp, makeVarDecl, 
  Binding, makeIfExp, makeAppExp, makePrimOp, makeVarRef, makeLitExp, IfExp, makeBoolExp,
isAppExp, isAtomicExp, isBinding, isBoolExp, makeBinding, isCExp, isClassExp, isCompoundExp, isDefineExp, isIfExp,
isLetExp, isPrimOp, isNumExp, isProcExp, isVarDecl, isVarRef, isLitExp, isProgram, makeProgram, isExp, makeDefineExp, 
makeLetExp} from "./L3-ast";
import { Result, makeFailure, mapResult, makeOk, mapv } from "../shared/result";
import { makeSymbolSExp } from "./L3-value";

/*
Purpose: Transform ClassExp to ProcExp
Signature: class2proc(classExp)
Type: ClassExp => ProcExp
*/
export const class2proc = (exp: ClassExp): ProcExp => {
    const msg = makeVarDecl("msg");
    return makeProcExp(exp.fields, [makeProcExp([msg], [makeIfChain(exp.methods, msg)])]);
}

export const makeIfChain = (bindings: Binding[], msg: VarDecl): IfExp => 
  bindings.length === 1 ? 
     makeIfExp(makeAppExp(makePrimOp("eq?"), [makeVarRef(msg.var), 
      makeLitExp(makeSymbolSExp(bindings[0].var.var))]), makeAppExp(bindings[0].val, []), makeBoolExp(false))
  :
   makeIfExp(makeAppExp(makePrimOp("eq?"), [makeVarRef(msg.var), 
    makeLitExp(makeSymbolSExp(bindings[0].var.var))]), makeAppExp(bindings[0].val, []), makeIfChain(bindings.slice(1), msg))


/*
Purpose: Transform all class forms in the given AST to procs
Signature: lexTransform(AST)
Type: [Exp | Program] => Result<Exp | Program>
*/

export const lexTransform = (exp: Exp | Program): Result<Exp | Program> => 
  isExp(exp) ? makeOk(lexTransformExp(exp)) :
  isProgram(exp) ? makeOk(makeProgram(map(lexTransformExp, exp.exps))) :
  makeFailure("not");


export const lexTransformExp = (exp: Exp): Exp =>
  isCExp(exp) ? lexTransformCExp(exp) :
  isDefineExp(exp) ? makeDefineExp(exp.var, lexTransformCExp(exp.val)) :
  exp;

  const lexTransformCExp = (exp: CExp): CExp =>
    isAtomicExp(exp) ? exp :
    isLitExp(exp) ? exp :
    isIfExp(exp) ? makeIfExp(lexTransformCExp(exp.test),
    lexTransformCExp(exp.then),
    lexTransformCExp(exp.alt)) :
    isAppExp(exp) ? makeAppExp(lexTransformCExp(exp.rator),
                               map(lexTransformCExp, exp.rands)) :
    isProcExp(exp) ? makeProcExp(exp.args, map(lexTransformCExp, exp.body)) :
    isLetExp(exp) ? makeLetExp(map(b => makeBinding(b.var.var, lexTransformCExp(b.val)), exp.bindings), 
    exp.body.map(lexTransformCExp)) :
    isClassExp(exp) ? lexTransformCExp(class2proc(exp)) :
    exp;


