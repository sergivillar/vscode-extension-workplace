import * as vscode from 'vscode';
import {taskProvider} from '../views/tasks';
import {TaskNode, TASK_STATUS, Tasks, TaskStatus} from '../nodes';

const promoteTask = async (task: TaskNode, context: vscode.ExtensionContext) => {
    const statusToPromote = TASK_STATUS.filter(status => status !== task.data.status);
    const nextStatus = await vscode.window.showQuickPick(statusToPromote, {
        placeHolder: 'Select next task status',
    });

    if (!nextStatus) {
        return;
    }

    const tasks = context.workspaceState.get('tasks') as Tasks;

    const newTasks = tasks.map(item => {
        if (item.id === task.data.id) {
            item.status = nextStatus as TaskStatus;
        }
        return item;
    });

    await context.workspaceState.update('tasks', newTasks);
    taskProvider.refresh();
};

export default promoteTask;
