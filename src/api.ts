import axios from 'axios';
import settings from './settings';

const getJiraTicketInfoUrl = (id: string) => `https://jira.tuenti.io/jira/rest/api/latest/issue/${id}`;
const getReviewsInfoFromJiraTicketUrl = (id: string) =>
    `https://fisheye.tuenti.io/rest-service/search-v1/reviewsForIssue.json?jiraKey=${id}`;

export const fetchJiraTicket = (ticketId: string) =>
    axios.get(getJiraTicketInfoUrl(ticketId), {
        headers: {Authorization: 'Basic ' + settings.getSettings().authToken},
    });

interface IUser {
    userName: string;
    displayName: string;
    avatarUrl: string;
    url: string;
}

type CodeReviewState = 'Review' | string;
type CodeReviewType = 'REVIEW' | string;
interface IReviewData {
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

export const fetchReviewsInfoFromJiraTicket = async (ticketId: string) =>
    (await axios.get(getReviewsInfoFromJiraTicketUrl(ticketId), {
        headers: {Authorization: 'Basic ' + settings.getSettings().authToken},
    })).data.reviewData as ReadonlyArray<IReviewData>;
