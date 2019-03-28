import axios from 'axios';
import {IFisheyeReview} from './models/fisheye';

export const fetchReviewsInfoFromJiraTicket = async (ticketId: string, authToken: string) =>
    (await axios.get(
        `https://fisheye.tuenti.io/rest-service/search-v1/reviewsForIssue.json?jiraKey=${ticketId}`,
        {
            headers: {Authorization: `Basic ${authToken}`},
        }
    )).data.reviewData as ReadonlyArray<IFisheyeReview>;
