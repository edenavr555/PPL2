import { ClassExp, ProcExp, Exp, Program, VarDecl, makeProcExp, makeVarDecl, Binding, makeIfExp, makeAppExp, makePrimOp, makeVarRef, makeLitExp, IfExp, makeBoolExp } from "./L3-ast";
import { Result, makeFailure } from "../shared/result";
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
      makeLitExp(bindings[0].var.var)]), bindings[0].val, makeBoolExp(false))
  :
   makeIfExp(makeAppExp(makePrimOp("eq?"), [makeVarRef(msg.var), 
    makeLitExp(bindings[0].var.var)]), bindings[0].val, makeIfChain(bindings.slice(1), msg))


/*
Purpose: Transform all class forms in the given AST to procs
Signature: lexTransform(AST)
Type: [Exp | Program] => Result<Exp | Program>
*/

export const lexTransform = (exp: Exp | Program): Result<Exp | Program> =>
    //@TODO
    makeFailure("kkkkkkkkk");
