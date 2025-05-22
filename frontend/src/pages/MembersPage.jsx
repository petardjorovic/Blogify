import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../components/Pagination';
import MemberCard from '../components/MemberCard';
import { showLoader } from '../store/loaderSlice';
import { useSearchParams } from 'react-router-dom';
import { getAllUsers } from '../services/memberService';
import { fadeInDown } from '../utils/animations';
import { motion } from 'framer-motion';
import MemberDetails from '../components/MemberDetails';
import SearchFormMember from '../components/SearchFormMember';

function MambersPage() {
    const { user } = useSelector((state) => state.userStore);
    const [searchParams, setSearchParams] = useSearchParams();
    const [members, setMembers] = useState([]);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsLimit, setItemsLimit] = useState(20);
    const [membersCount, setMembersCount] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [member, setMember] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    const fetchMembers = useCallback(async () => {
        dispatch(showLoader(true));
        const res = await getAllUsers(page, limit, member);
        dispatch(showLoader(false));

        if (res.status === 'success') {
            setMembers(res.members);
            setMembersCount(res.membersCount);
            if (res.members.length === 0) {
                setErrorMessage(true);
            } else {
                setErrorMessage(false);
            }
        } else {
            setErrorMessage(true);
        }
    }, [dispatch, limit, page, member]);

    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);

    useEffect(() => {
        setPage(searchParams.get('page') || 1);
        setLimit(searchParams.get('limit') || 20);
        setMember(searchParams.get('member') || '');
    }, [searchParams]);

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="mb-[20px] flex flex-col w-full md:w-2/3 order-2 md:order-1">
                {members.length > 0 && (
                    <Pagination
                        itemsCount={membersCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        itemsLimit={itemsLimit}
                    />
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
                                    <MemberCard member={member} key={member._id} rerenderView={fetchMembers} user={user} />
                                </motion.div>
                            );
                        })}
                </div>
                {errorMessage && (
                    <>
                        <div className="text-center py-10 text-gray-600">
                            <p className="text-lg font-semibold mb-2">No members found for your search.</p>
                            <p>Try different keywords or remove the filters.</p>
                        </div>
                    </>
                )}
                {members.length > 0 && (
                    <Pagination
                        itemsCount={membersCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        itemsLimit={itemsLimit}
                    />
                )}
            </div>
            <div className="w-full md:w-1/3 flex flex-col gap-3 order-1 md:order-2">
                <SearchFormMember setCurrentPage={setCurrentPage} />
                {user.role === 'admin' && <MemberDetails />}
            </div>
        </div>
    );
}

export default MambersPage;
