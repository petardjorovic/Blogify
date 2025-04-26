import { useState } from 'react';
import Comment from './Comment';
import { useSelector } from 'react-redux';
import Accordion from '../components/Accordion';

function CommentsList({ post, rerenderView }) {
    const { user } = useSelector((state) => state.userStore);
    return (
        post.comments.length > 0 && (
            <div>
                <h3 className="text-2xl font-medium mt-[15px] mb-[10px]">Comments:</h3>
                {post.comments.map((com, index) => {
                    return (
                        <Comment
                            key={index}
                            comment={com}
                            rerenderView={rerenderView}
                            postAuthorId={post.userId}
                            user={user}
                            indexKey={index}
                        />
                    );
                })}
            </div>
        )
    );
}

export default CommentsList;
