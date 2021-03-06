import axios from 'axios';
import {IJiraTask} from './models';

export const getTicket = async (ticketId: string, authToken: string) =>
    (await axios.get(`https://jira.tuenti.io/jira/rest/api/latest/issue/${ticketId}`, {
        headers: {Authorization: `Basic ${authToken}`},
    })).data as IJiraTask;
