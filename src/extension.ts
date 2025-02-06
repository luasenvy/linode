// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export const activate = (context: vscode.ExtensionContext) => {
  const disposable = vscode.commands.registerCommand("linode.run", function (){
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const document = editor.document;
      vscode.window.activeTextEditor?.edit((edit) => {
        editor.selections.forEach((selection) => {
          if (selection && !selection?.isEmpty) {
            const text = document.getText(selection);
            const code = text.replace(/=(\s+)?$/, "");
            try {
              edit.replace(selection, text.replace(/([\s=]+)?$/, () => " = ").concat(eval(code)));
            } catch (err) {
              if (err instanceof Error) {
                edit.replace(selection, `${code} = ${err.name}: ${err.message}`);
              }
              console.error(err);
            }
          }
        });
      });
    }
  });

  context.subscriptions.push(disposable);
};

// This method is called when your extension is deactivated
export function deactivate() {}
