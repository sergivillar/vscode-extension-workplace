import * as vscode from 'vscode';
import settings from '../settings';
import {fetchReviewsInfoFromJiraTicket} from '../api/fisheye';
import {taskProvider} from '../views/tasks';
import {Tasks} from '../nodes';
import {fetchJiraTicket} from '../api/jira';

const refreshTasks = (context: vscode.ExtensionContext) => async () => {
    const tasks = context.workspaceState.get('tasks') as Tasks;
    const taskToUpdate = [] as Tasks;

    try {
        for (const task of tasks) {
            // TODO ADD loading
            const {
                status,
                branchName,
                tickets: {main, related},
                createdAt,
            } = task;

            const {
                id,
                key,
                fields: {summary, description},
            } = await fetchJiraTicket(String(main.id), settings.authToken);

            const reviews = await fetchReviewsInfoFromJiraTicket(String(main.key), settings.authToken);

            taskToUpdate.push({
                status,
                branchName,
                tickets: {
                    main: {id: Number(id), key, name: summary, description},
                    related,
                },
                reviews: reviews.map(({name, permaId, state}) => ({id: permaId.id, name, state})),
                createdAt,
            });
        }

        await context.workspaceState.update('tasks', taskToUpdate);
        taskProvider.refresh();
        vscode.window.showInformationMessage('All tasks updated');
    } catch (error) {
        console.error(error);
        return vscode.window.showErrorMessage("There's any problem creating the new feature.");
    }
};

export default refreshTasks;
