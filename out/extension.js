"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const terminateSymbols = [
    "」",
    "。",
    "？",
    "！",
    "…",
    "♪"
];
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Register command
    let disposable = vscode.commands.registerCommand('extension.deleteUntil', () => {
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
            const cursorPosition = activeEditor.selection.active;
            const activeLine = activeEditor.document.lineAt(cursorPosition.line);
            let endChar = activeLine.text.length - 1;
            // Iterate until passing one of the terminate symbols
            for (endChar; endChar > cursorPosition.character; endChar--) {
                if (!terminateSymbols.includes(activeLine.text.charAt(endChar))) {
                    endChar++;
                    break;
                }
            }
            var endPosition = cursorPosition.with(cursorPosition.line, endChar);
            var removeSelection = new vscode.Selection(cursorPosition, endPosition);
            activeEditor.edit(builder => {
                builder.delete(removeSelection);
            });
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map