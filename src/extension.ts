// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { exec } from 'child_process';

const handleRun = () => {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    vscode.window.activeTextEditor?.edit(edit => {
      editor.selections.forEach(selection => {
        if (selection && !selection?.isEmpty) {
          const code = document.getText(selection);
          try {
            edit.replace(selection, `${code} = ${eval(code)}`);
          } catch(err) {
            if (err instanceof Error) {
              edit.replace(selection, `${code} = ${err.name}: ${err.message}`);
            }
            console.error(err);
          }
        }
      });
    });
  };
};

export const activate = (context: vscode.ExtensionContext) => {
  const run = vscode.commands.registerCommand('nodeline.run', handleRun);
  
  context.subscriptions.push(run);
};

export const deactivate = () => {};
