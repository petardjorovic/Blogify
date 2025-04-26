import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { routesConfig } from '../config/routesConfig';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userSlice';
import useWindowScroll from '../utils/useWindowScroll';
import useIsSmallScreen from '../utils/useIsSmallScreen';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa6';

function Navbar() {
    const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
    const { user } = useSelector((state) => state.userStore);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [x, y] = useWindowScroll();
    const isSmallScreen = useIsSmallScreen();

    const logoutUser = () => {
        setOpenBurgerMenu(false);
        navigate(routesConfig.LOGIN.path, { replace: true });
        dispatch(logout());
    };

    return (
        <header className="container mx-auto px-[16px]">
            <div className={`box flex items-center justify-between mt-[15px] mb-[40px]`}>
                <div className="flex items-center gap-[5px]">
                    <Link to={routesConfig.POST.path}>
                        <img src={logo} alt="logo" className="w-[50px]" />
                    </Link>
                    <p className="text-base">SocialNet</p>
                </div>
                <nav className="flex">
                    <ul className="flex gap-[10px] items-center">
                        {user ? (
                            isSmallScreen ? (
                                <>
                                    <Link to={routesConfig.DASHBOARD.path}>
                                        <img
                                            src={user.image.includes('uploads') ? `http://localhost:4000/${user.image}` : user.image}
                                            alt="avatar"
                                            className="w-[45px] h-[45px] rounded-full border object-cover"
                                        />
                                    </Link>

                                    <button
                                        className={`p-[10px] text-[30px] text-mainBlue z-50 ${openBurgerMenu && 'text-white'}`}
                                        onClick={() => setOpenBurgerMenu(!openBurgerMenu)}
                                    >
                                        {openBurgerMenu ? <FaArrowRight /> : <GiHamburgerMenu />}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <NavLink
                                            to={routesConfig.POST.path}
                                            className="border border-mainBlue p-[8px] rounded-[10px] uppercase"
                                        >
                                            Posts
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/member'} className="border border-mainBlue p-[8px] rounded-[10px] uppercase">
                                            Member
                                        </NavLink>
                                    </li>
                                    <li>
                                        <Button className="border border-mainBlue p-[8px] rounded-[10px] uppercase" onClick={logoutUser}>
                                            Log out
                                        </Button>
                                    </li>
                                    <li>
                                        <Link to={routesConfig.DASHBOARD.path} onClick={() => setOpenBurgerMenu(false)}>
                                            <img
                                                src={user.image.includes('uploads') ? `http://localhost:4000/${user.image}` : user.image}
                                                alt="avatar"
                                                className="w-[45px] h-[45px] rounded-full border object-cover"
                                            />
                                        </Link>
                                    </li>
                                </>
                            )
                        ) : isSmallScreen ? (
                            <>
                                <button
                                    className={`p-[10px] text-[30px] text-mainBlue z-50 ${openBurgerMenu && 'text-white'}`}
                                    onClick={() => setOpenBurgerMenu(!openBurgerMenu)}
                                >
                                    {openBurgerMenu ? <FaArrowRight /> : <GiHamburgerMenu />}
                                </button>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to={routesConfig.REGISTER.path}
                                        className="border border-mainBlue p-[8px] rounded-[10px] uppercase"
                                    >
                                        Register
                                    </Link>
                                </li>
                                <li>
                                    <Link to={routesConfig.LOGIN.path} className="border border-mainBlue p-[8px] rounded-[10px] uppercase">
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
            <AnimatePresence>
                {openBurgerMenu && (
                    <>
                        {/* Overlay koji zatvara klikom */}
                        <motion.div
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
                            onClick={() => setOpenBurgerMenu(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                        {/* Burger menu */}
                        <motion.div
                            className="absolute top-0 right-0 h-screen w-[130px] bg-mainBlue bg-opacity-90 text-white z-40 p-5 flex flex-col gap-6 rounded-l-sm"
                            variants={{ hidden: { x: 130 }, visible: { x: 0 } }}
                            initial={'hidden'}
                            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                            animate={'visible'}
                            exit={'hidden'}
                        >
                            {user ? (
                                <ul className="flex flex-col text-lg gap-6 mt-[60px]">
                                    <li className="border-2 uppercase font-medium border-white rounded-md p-[4px] text-center">
                                        <NavLink to={routesConfig.POST.path} className="" onClick={() => setOpenBurgerMenu(false)}>
                                            Posts
                                        </NavLink>
                                    </li>
                                    <li className="border-2 uppercase font-medium border-white rounded-md p-[4px] text-center">
                                        <NavLink to={'/member'} className="" onClick={() => setOpenBurgerMenu(false)}>
                                            Member
                                        </NavLink>
                                    </li>
                                    <li className="border-2 uppercase font-medium border-white rounded-md text-center">
                                        <Button className="uppercase p-[4px] m-0 text-lg" onClick={logoutUser}>
                                            Log out
                                        </Button>
                                    </li>
                                </ul>
                            ) : (
                                <ul className="flex flex-col text-lg gap-6 mt-[60px]">
                                    <li className="border-2 uppercase font-medium border-white rounded-md p-[4px] text-center">
                                        <Link to={routesConfig.REGISTER.path} className="" onClick={() => setOpenBurgerMenu(false)}>
                                            Register
                                        </Link>
                                    </li>
                                    <li className="border-2 uppercase font-medium border-white rounded-md p-[4px] text-center">
                                        <Link to={routesConfig.LOGIN.path} className="" onClick={() => setOpenBurgerMenu(false)}>
                                            Login
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Navbar;
