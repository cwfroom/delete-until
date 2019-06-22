// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Register command
	let disposable = vscode.commands.registerCommand('extension.deleteUntil', () => {
		const activeEditor = vscode.window.activeTextEditor;
		if (activeEditor) {
			const cursorPosition = activeEditor.selection.active;
			const activeLine = activeEditor.document.lineAt(cursorPosition.line);
			let endChar = cursorPosition.character;
			// Find postion until end of line
			// or not a character in CJK Unified Ideographs
			while (endChar < activeLine.text.length && 
				activeLine.text.charCodeAt(endChar) >= 0x4E00 && 
				activeLine.text.charCodeAt(endChar) <= 0x9FFF) {
					endChar++;
				}
			var endPosition = cursorPosition.with(cursorPosition.line, endChar);
			var removeSelection = new vscode.Selection(cursorPosition,endPosition);
			activeEditor.edit( builder => {
				builder.delete(removeSelection);
			});
		}
	});
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}