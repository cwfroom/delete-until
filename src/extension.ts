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
			// or not a valid character
			while (endChar < activeLine.text.length && validateChar(activeLine.text.charCodeAt(endChar))) {
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

function validateChar(ucode: number){
	// Basic Latin
	if (ucode <= 0x007F) {
		return true;
	// Hiragana and Katagana
	} else if (ucode >= 0x4E00 && ucode <= 0x9FFF) {
		return true;
	// CJK Unified Ideographs
	} else if (ucode >= 0x3040 && ucode <= 0x30FF){
		return true;
	// Halfwidth and Fullwidth Forms Numbers
	} else if (ucode >= 0xFF10 && ucode <= 0xFF19){
		return true;
	// Halfwidth and Fullwidth Forms Alphabet
	} else if (ucode >= 0xFF21 && ucode <= 0xFF3A){
		return true;
	// Halfwidth and Fullwidth Forms Half Kanas
	} else if (ucode >= 0xFF66 && ucode <= 0xFF9D){
		return true;
	} else {
		return false;
	}
}

// this method is called when your extension is deactivated
export function deactivate() {}
