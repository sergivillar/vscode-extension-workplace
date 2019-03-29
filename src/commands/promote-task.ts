import * as vscode from 'vscode';
import {taskProvider} from '../views/tasks';
import {TaskNode, TASK_STATUS, Tasks} from '../nodes';

const promoteTask = async (task: TaskNode, context: vscode.ExtensionContext) => {
    const statusToPromote = TASK_STATUS.filter(status => status !== task.data.status);
    const nextStatus = await vscode.window.showQuickPick(statusToPromote, {
        placeHolder: 'Select next task status',
    });

    if (!nextStatus) {
        return;
    }

    const tasks = context.workspaceState.get('tasks') as Tasks;
    console.log(nextStatus);
};

export default promoteTask;
