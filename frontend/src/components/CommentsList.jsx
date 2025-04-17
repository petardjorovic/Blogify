import React from 'react';
import Comment from './Comment';
import { useSelector } from 'react-redux';

function CommentsList({ post, rerenderView }) {
    const { user } = useSelector((state) => state.userStore);
    return (
        <div>
            <h3 className="text-2xl font-medium mt-[15px]">Comments:</h3>
            {post.comments.length > 0 &&
                post.comments.map((com, index) => {
                    return <Comment key={index} comment={com} rerenderView={rerenderView} postAuthorId={post.userId} user={user} />;
                })}
        </div>
    );
}

export default CommentsList;
