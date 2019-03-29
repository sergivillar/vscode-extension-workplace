import {TreeItem} from 'vscode';

export const TASK_STATUS_WIP = 'working';
export const TASK_STATUS_REVIEW = 'review';
export const TASK_STATUS_DONE = 'done';

export type TaskStatus = typeof TASK_STATUS_WIP | typeof TASK_STATUS_DONE | typeof TASK_STATUS_REVIEW;

export const TASK_STATUS: TaskStatus[] = ['working', 'review', 'done'];

interface ITicket {
    id: number;
    key: string;
    name: string;
    description: string;
}

interface IReview {
    id: string;
    name: string;
    state: string;
}

export interface Tickets {
    main: ITicket;
    related: ReadonlyArray<ITicket>;
}

export interface ITask {
    id: string;
    status: TaskStatus;
    branchName: string;
    tickets: Tickets;
    reviews?: Reviews;
    createdAt: number;
}

export type Tasks = ITask[];
export type Reviews = IReview[];

interface ITreeNodeBase<Type extends string, Data> {
    type: Type;
    data: Data;
    treeItem: TreeItem;
}

export type TaskStatusNode = ITreeNodeBase<'task-status', TaskStatus>;
export type TaskNode = ITreeNodeBase<'task', ITask>;
export type TicketNode = ITreeNodeBase<'ticket', ITicket>;
export type TicketsNode = ITreeNodeBase<'tickets', Tickets>;
export type ReviewsNode = ITreeNodeBase<'reviews', Reviews>;
export type ReviewNode = ITreeNodeBase<'review', IReview>;

export type TreeNode = TaskStatusNode | TaskNode | TicketNode | TicketsNode | ReviewsNode | ReviewNode;
