import { TaskNode, TreeNode, TicketsNode, ReviewsNode } from "../../nodes";
import { TreeItemCollapsibleState } from "vscode";

export default (element: TaskNode) => {
    const children = [] as TreeNode[];
    const jiraNode: TicketsNode = {
        type: 'tickets',
        data: element.data.tickets,
        treeItem: {
            label: 'Tickets',
            collapsibleState: TreeItemCollapsibleState.Collapsed,
        },
    };
    children.push(jiraNode);

    if (element.data.reviews) {
        const fisheyeReviewsNode: ReviewsNode = {
            type: 'reviews',
            data: element.data.reviews,
            treeItem: {
                label: 'Reviews',
                collapsibleState: TreeItemCollapsibleState.Collapsed,
            },
        };
        children.push(fisheyeReviewsNode);
    }

    return children;
}