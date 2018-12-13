interface Ticket {
    id: number;
    name: string;
    description: string;
}

interface JiraTickets {
    mainTicket: Ticket;
    realtedTickets: Ticket[];
}

export interface Working {
    branchName: string;
    jira: JiraTickets;
    fisheye?: {
        review: string;
    };
}

export type Workings = Working[];
