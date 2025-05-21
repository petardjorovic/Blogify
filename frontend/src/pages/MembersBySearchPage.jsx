import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function MembersBySearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [posts, setPosts] = useState([]);
    return <div>MembersBySearchPage</div>;
}

export default MembersBySearchPage;
