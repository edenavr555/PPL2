import { ClassExp, ProcExp, Exp, Program, VarDecl, makeProcExp, makeVarDecl, Binding, makeIfExp } from "./L3-ast";
import { Result, makeFailure } from "../shared/result";

/*
Purpose: Transform ClassExp to ProcExp
Signature: class2proc(classExp)
Type: ClassExp => ProcExp
*/
export const class2proc = (exp: ClassExp): ProcExp => {
    const msg = makeVarDecl("msg");
    makeProcExp(exp.fields, makeProcExp([msg], makeIfChain(exp.methods, msg)));
}

export const makeIfChain = (bindings: Binding[], msg: VarDecl): ProcExp => {
    makeIfExp(), 

}


/*
Purpose: Transform all class forms in the given AST to procs
Signature: lexTransform(AST)
Type: [Exp | Program] => Result<Exp | Program>
*/

export const lexTransform = (exp: Exp | Program): Result<Exp | Program> =>
    //@TODO
    makeFailure("ToDo");
