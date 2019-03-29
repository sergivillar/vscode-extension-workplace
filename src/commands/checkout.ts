import * as vscode from 'vscode';
import {TaskNode} from '../nodes';

const checkoutToTask = async (task: TaskNode, context: vscode.ExtensionContext) => {
    console.log('About to checkout to ', task.data.branchName);
};

export default checkoutToTask;
