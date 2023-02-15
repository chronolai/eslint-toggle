import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("eslint-toggle.toggle", () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const document = editor.document;
    const firstLine = document.lineAt(0);
    const text = firstLine.text;

    if (text.startsWith("/* eslint-disable */")) {
      editor.edit((editBuilder) => {
        editBuilder.delete(firstLine.rangeIncludingLineBreak);
      });
    } else {
      editor.edit((editBuilder) => {
        editBuilder.insert(new vscode.Position(0, 0), "/* eslint-disable */\n");
      });
    }
  });
  context.subscriptions.push(disposable);
}

export function deactivate() {}
