import React from 'react';
import { useParams } from 'react-router-dom';

function AuthorPage() {
    const { userId } = useParams();
    return (
        <div>
            <p>Author Page</p>
            <p>UserId: {userId}</p>
        </div>
    );
}

export default AuthorPage;
