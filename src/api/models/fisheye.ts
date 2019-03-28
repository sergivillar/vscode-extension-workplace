interface IUser {
    userName: string;
    displayName: string;
    avatarUrl: string;
    url: string;
}

type CodeReviewState = 'Review' | string;
type CodeReviewType = 'REVIEW' | string;
export interface IFisheyeReview {
    projectKey: string;
    name: string;
    description: string;
    author: IUser;
    creator: IUser;
    permaId: {
        id: string;
    };
    permaIdHistory: string[];
    state: CodeReviewState;
    type: CodeReviewType;
    allowReviewersToJoin: boolean;
    metricsVersion: number;
    /**
     * @example
     * "2019-03-28T10:24:21.617+0000"
     */
    createDate: string;
    /**
     * @example
     * "2019-04-01T09:30:00.000+0000"
     */
    dueDate: string;
    /**
     * @example
     * "ACCOUNT-7651"
     */
    jiraIssueKey: string;
}
