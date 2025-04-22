import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SearchFormMember from '../components/SearchFormMember';
import MemberDetails from '../components/MemberDetails';

function MemberLayout() {
    const [memberInfo, setMemberInfo] = useState(null);
    return (
        <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row px-[16px] gap-[20px]">
                <div className="w-full lg:w-2/3">
                    <Outlet context={{ setMemberInfo }} />
                </div>
                <div className="w-full lg:w-1/3 flex flex-col gap-[20px]">
                    <SearchFormMember />
                    <MemberDetails memberInfo={memberInfo} />
                </div>
            </div>
        </div>
    );
}

export default MemberLayout;
