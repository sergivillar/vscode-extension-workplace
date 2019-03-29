import * as vscode from 'vscode';
import {TaskNode} from '../nodes';
import {isWorkingTreeClean, checkoutToBranch} from '../api/git';

const checkoutToTask = async (task: TaskNode, context: vscode.ExtensionContext) => {
    if (!isWorkingTreeClean) {
        return vscode.window.showErrorMessage('Please, commit all your cahnges before doing the checkout.');
    }

    checkoutToBranch(task.data.branchName);
};

export default checkoutToTask;
