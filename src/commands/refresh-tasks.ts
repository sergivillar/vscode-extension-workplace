import * as vscode from 'vscode';

function refreshTask(context: vscode.ExtensionContext): (...args: any[]) => any {
    return async () => {
        console.log('Refresh');
    };
}

export default refreshTask;
