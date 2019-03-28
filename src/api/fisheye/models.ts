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

type ReadStatus = 'READ' | string;

export interface IComment {
    metrics: {};
    message: string;
    draft: boolean;
    deleted: boolean;
    defectRaised: boolean;
    defectApproved: boolean;
    readStatus: ReadStatus;
    user: IUser;
    createDate: number;
    permaId: string;
    replies: ReadonlyArray<IComment>;
    reviewItemId: {id: string};
}

export interface IReviewDetails {
    projectKey: string;
    name: string;
    description: string;
    author: IUser;
    creator: IUser;
    permaId: {id: string};
    permaIdHistory: [string];
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
    jiraIssueKey: string;
    reviewers: {
        reviewer: ReadonlyArray<{
            userName: string;
            displayName: string;
            avatarUrl: string;
            completed: boolean;
            timeSpent: number;
        }>;
    };
    reviewItems: {
        reviewItem: [
            {
                permId: {id: string};
                participants: ReadonlyArray<{
                    user: IUser;
                    completed: boolean;
                }>;
                repositoryName: string;
                fromPath: string;
                fromRevision: string;
                toPath: string;
                toRevision: string;
                toContentUrl: string;
                fileType: string;
                commitType: string;
                authorName: string;
                showAsDiff: false;
                commitDate: number;
                expandedRevisions: ReadonlyArray<{
                        addDate: number;
                        revision: string;
                        path: string;
                        contentUrl: string;
                        source: string;
                        changedLines: number;
                        fileType: string;
                        commitType: string;
                    }>;
            }
        ];
    };
    generalComments: {comments: []};
    versionedComments: {
        comments: ReadonlyArray<{
                metrics: {};
                message: string;
                draft: boolean;
                deleted: boolean;
                defectRaised: boolean;
                defectApproved: boolean;
                readStatus: ReadStatus;
                user: IUser;
                createDate: 1553795666950;
                permaId: string;
                replies: [];
                messageAsHtml: string;
                reviewItemId: {id: string};
            }>;
    };
    transitions: {
        transitionData: ReadonlyArray<
            {name: string; displayName: string}>;
    };
    actions: {
        actionData: ReadonlyArray<
            {name: string; displayName: string}
        >;
    };
    stats: [
        ReadonlyArray<{
            user: string;
            published: number;
            drafts: number;
            defects: number;
            unread: number;
            leaveUnread: number;
            read: number;
        }>
    ];
}
