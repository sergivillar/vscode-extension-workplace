export const TASK_STATUS_WIP = 'working';
export const TASK_STATUS_DONE = 'done';

type TaskStatus = typeof TASK_STATUS_WIP | typeof TASK_STATUS_DONE;

interface Ticket {
    id: number;
    key: string;
    name: string;
    description: string;
}

interface Review {
    id: string;
    name: string;
    state: string;
}

export interface JiraTicket {
    mainTicket: Ticket;
    relatedTickets: ReadonlyArray<Ticket>;
}

export function isJiraTicket(data: any): data is JiraTicket {
    return 'mainTicket' in (data as JiraTicket);
}

export function isCR(data: any): data is Reviews {
    return 'state' in (data[0] || ([] as Reviews));
}

export interface Task {
    status: TaskStatus;
    branchName: string;
    jira: JiraTicket;
    fisheye?: Reviews;
    createdAt: number;
}

export function isTask(data: any): data is Task {
    return 'jira' in (data as Task);
}

export function isReview(data: any): data is Task {
    return 'fisheye' in (data as Task);
}

export type Tasks = Task[];
export type Reviews = Review[];
