import axios from 'axios';
import settings from './settings';

const getJiraTicketInfoUrl = (id: string) => `https://jira.tuenti.io/jira/rest/api/latest/issue/${id}`;
const getReviewsInfoFromJiraTicketUrl = (id: string) =>
    `https://fisheye.tuenti.io/rest-service/search-v1/reviewsForIssue.json?jiraKey=${id}`;

export const fetchJiraTicket = (ticketId: string) =>
    axios.get(getJiraTicketInfoUrl(ticketId), {
        headers: {Authorization: 'Basic ' + settings.getSettings().authToken},
    });
