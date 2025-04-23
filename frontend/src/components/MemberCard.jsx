import React from 'react';
import { formatDate } from '../utils/formatDate';
import { BsBinoculars, BsEye, BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { routesConfig } from '../config/routesConfig';
import { useDispatch } from 'react-redux';
import { getMemberInfo } from '../services/memberService';
import { showLoader } from '../store/loaderSlice';

function MemberCard({ member, setMemberInfo }) {
    const dispatch = useDispatch();
    const handleMemberInfo = async () => {
        dispatch(showLoader(true));
        const res = await getMemberInfo(member._id);
        dispatch(showLoader(false));
        if (res.status === 'success') setMemberInfo(res.member);
    };
    return (
        <div className="box flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col md:flex-row items-center gap-[20px]">
                <img
                    src={member.image.includes('uploads') ? `http://localhost:4000/${member.image}` : member.image}
                    alt="avatar"
                    className="w-[70px] h-[70px] object-cover rounded-full border"
                />
                <div>
                    <h5 className="text-lg font-semibold text-center md:text-start">{member.firstName + ' ' + member.lastName}</h5>
                    <p>
                        <span className="font-semibold">Gender:</span> {member.gender}
                    </p>
                    <p>
                        <span className="font-semibold">Email:</span> {member.email}
                    </p>
                </div>
            </div>
            <div className="">
                <p className="">
                    <span className="font-semibold">Role:</span> {member.role}
                </p>
            </div>
            <div>
                <p>
                    <span className="font-semibold">Birth date:</span> {formatDate(member.birthDate)}
                </p>
                <p>
                    <span className="font-semibold">Member from:</span> {formatDate(member.createdAt)}
                </p>
            </div>
            <div className="flex md:flex-col gap-[10px]">
                <Link
                    to={routesConfig.POST_AUTHOR.realPath(member._id)}
                    className="w-[30px] h-[30px] bg-teal-500 rounded-md flex items-center justify-center"
                >
                    <BsBinoculars />
                </Link>
                <button
                    className="w-[30px] h-[30px] bg-green-700 rounded-md flex items-center justify-center text-white"
                    onClick={handleMemberInfo}
                >
                    <BsEye />
                </button>
                <button className="w-[30px] h-[30px] bg-red-700 rounded-md flex items-center justify-center text-white">
                    <BsTrash />
                </button>
            </div>
        </div>
    );
}

export default MemberCard;
