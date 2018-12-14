export const TASK_STATUS_WIP = 'working';
export const TASK_STATUS_DONE = 'done';

type TaskStatus = typeof TASK_STATUS_WIP | typeof TASK_STATUS_DONE;

interface Ticket {
    id: number;
    name: string;
    description: string;
}

interface Review {
    id: string;
    status: string;
    title: string;
}

export interface JiraTicket {
    mainTicket: Ticket;
    relatedTickets: Ticket[];
}

export function isJiraTicket(data: any): data is JiraTicket {
    return 'mainTicket' in (data as JiraTicket);
}

export interface Task {
    status: TaskStatus;
    branchName: string;
    jira: JiraTicket;
    fisheye?: Review;
    createdAt: number;
}

export function isTask(data: any): data is Task {
    return 'jira' in (data as Task);
}

export type Tasks = Task[];
