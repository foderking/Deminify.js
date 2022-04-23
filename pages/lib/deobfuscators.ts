import { RefactorQueryAPI } from "shift-refactor/dist/src/refactor-session-chainable";
import ast from "shift-ast";
import "../../types/iterators"

function filterNamedArrays( node: ast.VariableDeclarator ) {
	return (node.init as ast.ArrayExpression).elements.findIndex( element => !(element as ast.ArrayExpression).type.startsWith("Literal")) === -1
}

function replaceComputedExpression(node: ast.ComputedMemberExpression, array: ast.VariableDeclarator) {
	return (array.init as ast.ArrayExpression).elements[(node.expression as ast.LiteralNumericExpression).value]!
} 

export function substituteArrayLiterals(script: RefactorQueryAPI) {
    const allNamedArrays = script.query(`VariableDeclarator[init.type="ArrayExpression"]`)
    const allNamedLiteralArrays = allNamedArrays.filter(filterNamedArrays)
	// console.log(allNamedLiteralArrays)

    allNamedLiteralArrays.forEach((array: ast.VariableDeclarator) => {
        const query = `ComputedMemberExpression[object.type=IdentifierExpression][object.name=${JSON.stringify(
            (array.binding as ast.BindingIdentifier).name
        )}][expression.type="LiteralNumericExpression"]`
		// console.log(script.query(query))
        script.query(query).replace((node) => replaceComputedExpression(node as ast.ComputedMemberExpression, array))
    });
}