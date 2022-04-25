import { RefactorSessionChainable } from "shift-refactor/dist/src/refactor-session-chainable"
import ast from "shift-ast"

declare module "shift-refactor/dist/src/refactor-session-chainable" {
	interface RefactorSessionChainable {
		filter(f: (node: ast.Node, i?: Number) => ast.Node): RefactorSessionChainable
	}
}