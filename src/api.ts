import axios from 'axios';
import settings from './settings';

const getJiraTicketInfoUrl = (id: string) => `https://jira.tuenti.io/jira/rest/api/latest/issue/${id}`;
const getReviewsInfoFromJiraTicketUrl = (id: string) =>
    `https://jira.tuenti.io/jira/rest/dev-status/latest/issue/detail?issueId=${id}&applicationType=fecru&dataType=review`;

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
