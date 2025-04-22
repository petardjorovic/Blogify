import { useEffect, useState } from 'react';
import { BsEye } from 'react-icons/bs';
import { formatDate } from '../utils/formatDate';
import { Link } from 'react-router-dom';
import { routesConfig } from '../config/routesConfig';

function MemberDetails({ memberInfo }) {
    const [user, setUser] = useState(memberInfo);

    useEffect(() => {
        setUser(memberInfo);
    }, [memberInfo]);

    return (
        <div className="box mt-[10px] text-center">
            {user ? (
                <div>
                    <div className="flex flex-col items-center">
                        <img
                            src={user.image.includes('uploads') ? `http://localhost:4000/${user.image}` : user.image}
                            alt="avatar"
                            className="w-[200px] h-[200px] object-cover rounded-full border border-black"
                        />
                        <p className="text-xl font-semibold">{user.firstName + ' ' + user.lastName}</p>
                    </div>
                    <div className="mt-[15px]">
                        <p className="border rounded-t-md py-[5px] px-[15px] text-lg text-start">
                            <span className="font-semibold">Role:</span> {user.role}
                        </p>
                        <p className="border border-t-[0px] py-[5px] px-[15px] text-lg text-start">
                            <span className="font-semibold">Gender:</span> {user.gender}
                        </p>
                        <p className="border border-t-[0px] py-[5px] px-[15px] text-lg text-start">
                            <span className="font-semibold">Birth:</span> {formatDate(user.birthDate)}
                        </p>
                        <p className="border border-t-[0px] py-[5px] px-[15px] text-lg text-start">
                            <span className="font-semibold">Registered:</span> {formatDate(user.createdAt)}
                        </p>
                        <p className="border border-t-[0px] py-[5px] px-[15px] text-lg text-start">
                            <span className="font-semibold">Email:</span> {user.email}
                        </p>
                        <p className="border border-t-[0px] rounded-b-md py-[5px] px-[15px] text-lg text-start">
                            <span className="font-semibold">Number of posts:</span> {user.posts.length}{' '}
                            <Link
                                className="bg-mainBlue text-white px-[6px] py-[2px] rounded-sm text-base inline-flex items-center justify-center"
                                to={routesConfig.POST_AUTHOR.realPath(user._id)}
                            >
                                All
                            </Link>
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    If you like to view a member details click on
                    <p className="flex items-center justify-center">
                        <BsEye />
                    </p>
                </>
            )}
        </div>
    );
}

export default MemberDetails;
