import axios from 'axios';
import settings from './settings';

const JIRA_URL = 'https://jira.tuenti.io/jira/rest/api/latest/';
const ISSUES_PATH = 'issue/';

const fetchJiraTicket = (ticketId: string) =>
    axios.get(JIRA_URL + ISSUES_PATH + ticketId, {
        headers: {Authorization: 'Basic ' + settings.getSettings().authToken},
    });

const api = {fetchJiraTicket};

export default api;
