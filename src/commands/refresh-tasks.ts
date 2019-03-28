import * as vscode from 'vscode';
import {fetchJiraTicket, fetchReviewsInfoFromJiraTicket} from '../api';
import {taskProvider} from '../views/tasks';
import {Tasks} from '../model';

const refreshTasks = (context: vscode.ExtensionContext) => async () => {
    const tasks = context.workspaceState.get('tasks') as Tasks;
    const taskToUpdate = [] as Tasks;

    try {
        for (const task of tasks) {
            // TODO ADD loading
            const {
                status,
                branchName,
                jira: {mainTicket, relatedTickets},
                createdAt,
            } = task;

            const {data: mainTicketData} = await fetchJiraTicket(String(mainTicket.id));

            const {
                id,
                key,
                fields: {summary, description},
            } = mainTicketData;

            const reviews = await fetchReviewsInfoFromJiraTicket(String(mainTicket.key));

            taskToUpdate.push({
                status,
                branchName,
                jira: {
                    mainTicket: {id, key, name: summary, description},
                    relatedTickets,
                },
                fisheye: reviews.map(({name, permaId, state}) => ({id: permaId.id, name, state})),
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
