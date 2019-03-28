import axios from 'axios';
import {IFisheyeReview, IComment, IReviewDetails} from './models';

export const getReviewsByTicket = async (ticketId: string, authToken: string) =>
    (await axios.get(
        `https://fisheye.tuenti.io/rest-service/search-v1/reviewsForIssue.json?jiraKey=${ticketId}`,
        {
            headers: {Authorization: `Basic ${authToken}`},
        }
    )).data.reviewData as ReadonlyArray<IFisheyeReview>;

export const getReviewDetailsById = async (reviewId: string, authToken: string) =>
    (await axios.get(`https://fisheye.tuenti.io/rest-service/reviews-v1/${reviewId}/details`, {
        headers: {Authorization: `Basic ${authToken}`},
    })).data as IReviewDetails;

export const getReviewComments = async (reviewId: string, authToken: string) =>
    (await axios.get(`https://fisheye.tuenti.io/rest-service/reviews-v1/${reviewId}/comments`, {
        headers: {Authorization: `Basic ${authToken}`},
    })).data.comments as ReadonlyArray<IComment>;
