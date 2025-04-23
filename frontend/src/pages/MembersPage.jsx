import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Pagination from '../components/Pagination';
import MemberCard from '../components/MemberCard';
import { showLoader } from '../store/loaderSlice';
import { useSearchParams } from 'react-router-dom';
import { getAllUsers } from '../services/memberService';

function MambersPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [members, setMembers] = useState([]);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsLimit, setItemsLimit] = useState(20);
    const [membersCount, setMembersCount] = useState(0);

    const fetchMembers = async () => {
        const page = searchParams.get('page') || 1;
        const limit = searchParams.get('limit') || 20;
        dispatch(showLoader(true));
        const res = await getAllUsers(page, limit);
        dispatch(showLoader(false));
        if (res.status === 'success') {
            setMembers(res.members);
            setMembersCount(res.membersCount);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, [searchParams]);

    return (
        <>
            {members.length > 0 && (
                <Pagination itemsCount={membersCount} currentPage={currentPage} setCurrentPage={setCurrentPage} itemsLimit={itemsLimit} />
            )}
            <div className="my-[15px] flex flex-col gap-[10px]">
                {members.length > 0 &&
                    members.map((member) => {
                        return <MemberCard member={member} key={member._id} />;
                    })}
            </div>
            {members.length > 0 && (
                <Pagination itemsCount={membersCount} currentPage={currentPage} setCurrentPage={setCurrentPage} itemsLimit={itemsLimit} />
            )}
        </>
    );
}

export default MambersPage;
