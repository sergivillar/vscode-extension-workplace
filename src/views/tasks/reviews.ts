import {ReviewsNode, TreeNode} from '../../nodes';
import {getReviewDetailsById} from '../../api/fisheye';
import Settings from '../../settings';
import {TreeItemCollapsibleState} from 'vscode';

export default async (element: ReviewsNode) => {
    const children = [] as TreeNode[];
    for (const review of element.data) {
        const {
            reviewers: {reviewer: reviewers},
        } = await getReviewDetailsById(review.id, Settings.authToken);
        const totalReviewers = reviewers.length;
        const completedReviewers = reviewers.reduce(
            (count, {completed}) => (completed ? count + 1 : count),
            0
        );
        children.push({
            type: 'review',
            data: review,
            treeItem: {
                label: `${completedReviewers === totalReviewers ? '✔' : '🧐'} (${completedReviewers}/${totalReviewers}) ${
                    review.id
                } - ${review.name}`,
                collapsibleState: TreeItemCollapsibleState.None,
                command: {
                    command: 'webapp-workplace.openInBrowser',
                    title: '',
                    arguments: [`https://fisheye.tuenti.io/cru/${review.id}`],
                },
            },
        });
    }

    return children;
};
