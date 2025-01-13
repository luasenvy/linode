import * as vscode from "vscode";

const handleRun = () => {
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
};

export const activate = (context: vscode.ExtensionContext) => {
  const run = vscode.commands.registerCommand("nodeline.run", handleRun);

  context.subscriptions.push(run);
};

export const deactivate = () => {};
