import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Pagination from '../components/Pagination';
import MemberCard from '../components/MemberCard';
import { showLoader } from '../store/loaderSlice';
import { useSearchParams } from 'react-router-dom';
import { getAllUsers } from '../services/memberService';
import { fadeInDown } from '../utils/animations';
import { motion } from 'framer-motion';

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
            <div className="my-[15px] flex flex-col gap-[10px] overflow-y-hidden">
                {members.length > 0 &&
                    members.map((member, index) => {
                        return (
                            <motion.div
                                key={member._id}
                                //  jednostavna varijanta, koja radi isto
                                // initial={index % 2 === 0 ? { opacity: 0, x: 100 }:{ opacity: 0, x: 100 }}
                                // animate={{ opacity: 1, x: 0 }}
                                // transition={{ delay: index * 0.1, duration: 0.6 }}
                                custom={index}
                                variants={fadeInDown}
                                initial="hidden"
                                animate="visible"
                            >
                                <MemberCard member={member} key={member._id} />
                            </motion.div>
                        );
                    })}
            </div>
            {members.length > 0 && (
                <Pagination itemsCount={membersCount} currentPage={currentPage} setCurrentPage={setCurrentPage} itemsLimit={itemsLimit} />
            )}
        </>
    );
}

export default MambersPage;
