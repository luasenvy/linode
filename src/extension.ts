// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { exec } from 'child_process';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "nodeline" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const run = vscode.commands.registerCommand('nodeline.run', () => {

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
      }
  });

  context.subscriptions.push(run);
}

// This method is called when your extension is deactivated
export function deactivate() {}
