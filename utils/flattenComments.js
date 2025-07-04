//flatten comments data
function flattenComments(data) {
    const flatList = [];

    for (const main of data) {
        // main comment
        flatList.push({
        type: 'comment',
        ...main
        });

        // replies
        for (const reply of main.replies ?? []) {
        flatList.push({
            type: 'comment',
            ...reply
        });
        }

        // view more replies button
        const shownReplies = main.replies?.length || 0;
        if (main.replycount > shownReplies) {
        flatList.push({
            type: 'more-replies',
            mainCommentID: main.commentid,
        });
        }
    }

    return flatList;
}

export default flattenComments;