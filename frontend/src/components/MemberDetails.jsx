import { useEffect, useState, useRef } from 'react';
import { BsEye } from 'react-icons/bs';
import { formatDate } from '../utils/formatDate';
import { Link } from 'react-router-dom';
import { routesConfig } from '../config/routesConfig';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { blurSlideIn } from '../utils/animations';
import { setMemberInfo } from '../store/memberSlice';

function MemberDetails() {
    const { memberInfo } = useSelector((state) => state.memberStore);
    const [showDetails, setShowDetails] = useState(false);
    const dispatch = useDispatch();
    // const detailsRef = useRef(null);

    function scrollToTop() {
        window.scrollTo({
            top: 120, // Skroluje 120 piksela od vrha stranice
            behavior: 'smooth', // Animacija
        });
    }

    useEffect(() => {
        dispatch(setMemberInfo({}));
    }, []);

    useEffect(() => {
        if (memberInfo?._id) {
            // Prvo sakrij detalje dok se ne skroluje
            setShowDetails(false);

            // Skroluj do MemberDetails bloka
            setTimeout(() => {
                // detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
                scrollToTop();

                // Posle kratke pauze, pokazi sa animacijom
                setTimeout(() => {
                    setShowDetails(true);
                }, 400); // vreme dok se skroluje
            }, 50);
            window.scrollTo({
                top: 120,
                behavior: 'smooth',
            });
        }
    }, [memberInfo]);

    return (
        <AnimatePresence mode="wait">
            {showDetails && (
                <motion.div
                    variants={blurSlideIn}
                    initial="hidden"
                    animate="visible"
                    key={memberInfo._id}
                    // ref={detailsRef}
                    className="box mt-[10px] text-center"
                >
                    {Object.hasOwn(memberInfo, '_id') ? (
                        <div>
                            <div className="flex flex-col items-center">
                                <img
                                    src={
                                        memberInfo.image.includes('uploads')
                                            ? `http://localhost:4000/${memberInfo.image}`
                                            : memberInfo.image
                                    }
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
                            If you like to view a member details click on
                            <p className="flex items-center justify-center">
                                <BsEye />
                            </p>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default MemberDetails;
