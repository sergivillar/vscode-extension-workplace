import axios from 'axios';

export const fetchJiraTicket = (ticketId: string, authToken: string) =>
    axios.get(`https://jira.tuenti.io/jira/rest/api/latest/issue/${ticketId}`, {
        headers: {Authorization: `Basic ${authToken}`},
    });
