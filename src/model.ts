interface Ticket {
    id: number;
    name: string;
    description: string;
}

export interface Working {
    branchName: string;
    jira: {
        mainTicket: Ticket;
        realtedTickets: Ticket[];
    };
    fisheye?: {
        review: string;
    };
}

export type Workings = Working[];
