import { BsEye } from 'react-icons/bs';
import { formatDate } from '../utils/formatDate';
import { Link } from 'react-router-dom';
import { routesConfig } from '../config/routesConfig';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { scaleIn } from '../utils/animations';

function MemberDetails() {
    const { memberInfo } = useSelector((state) => state.memberStore);

    return (
        <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            key={memberInfo._id}
            className="box mt-[10px] text-center sticky top-[10px]"
        >
            {Object.hasOwn(memberInfo, '_id') ? (
                <div>
                    <div className="flex flex-col items-center">
                        <img
                            src={memberInfo.image.includes('uploads') ? `http://localhost:4000/${memberInfo.image}` : memberInfo.image}
                            alt="avatar"
                            className="w-[200px] h-[200px] object-cover rounded-full border border-black"
                        />
                        <p className="text-xl font-semibold">{memberInfo.firstName + ' ' + memberInfo.lastName}</p>
                    </div>
                    <div className="mt-[15px]">
                        <p className="border rounded-t-md py-[5px] px-[15px] text-lg text-start">
                            <span className="font-semibold">Role:</span> {memberInfo.role}
                        </p>
                        <p className="border border-t-[0px] py-[5px] px-[15px] text-lg text-start">
                            <span className="font-semibold">Gender:</span> {memberInfo.gender}
                        </p>
                        <p className="border border-t-[0px] py-[5px] px-[15px] text-lg text-start">
                            <span className="font-semibold">Birth:</span> {formatDate(memberInfo.birthDate)}
                        </p>
                        <p className="border border-t-[0px] py-[5px] px-[15px] text-lg text-start">
                            <span className="font-semibold">Registered:</span> {formatDate(memberInfo.createdAt)}
                        </p>
                        <p className="border border-t-[0px] py-[5px] px-[15px] text-lg text-start">
                            <span className="font-semibold">Email:</span> {memberInfo.email}
                        </p>
                        <p className="border border-t-[0px] rounded-b-md py-[5px] px-[15px] text-lg text-start">
                            <span className="font-semibold">Number of posts:</span> {memberInfo.posts.length}{' '}
                            <Link
                                className="bg-mainBlue text-white px-[6px] py-[2px] rounded-sm text-base inline-flex items-center justify-center"
                                to={routesConfig.POST_AUTHOR.realPath(memberInfo._id)}
                            >
                                All
                            </Link>
                        </p>
                    </div>
                </div>
            ) : (
                <div>
                    If you like to preview a member details click on
                    <p className="flex items-center justify-center">
                        <BsEye />
                    </p>
                </div>
            )}
        </motion.div>
    );
}

export default MemberDetails;
