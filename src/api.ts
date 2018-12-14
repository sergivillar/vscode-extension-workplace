import axios from 'axios';
import settings from './settings';

const getJiraTicketInfoUrl = (id: string) => `https://jira.tuenti.io/jira/rest/api/latest/issue/${id}`;
const getReviewsInfoFromJiraTicketUrl = (id: string) =>
    `https://fisheye.tuenti.io/rest-service/search-v1/reviewsForIssue.json?jiraKey=${id}`;

const fetchJiraTicket = (ticketId: string) =>
    axios.get(getJiraTicketInfoUrl(ticketId), {
        headers: {Authorization: 'Basic ' + settings.getSettings().authToken},
    });

const fetchReviewsInfoFromJiraTicket = (ticketId: string) =>
    axios.get(getReviewsInfoFromJiraTicketUrl(ticketId), {
        headers: {Authorization: 'Basic ' + settings.getSettings().authToken},
    });

const api = {fetchJiraTicket, fetchReviewsInfoFromJiraTicket};

export default api;
