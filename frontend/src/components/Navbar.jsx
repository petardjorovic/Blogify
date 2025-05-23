import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { routesConfig } from '../config/routesConfig';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userSlice';
import useIsSmallScreen from '../utils/useIsSmallScreen';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa6';
import useLockScroll from '../utils/useLockScroll';
import DashboardSidebar from '../components/DashboardSidebar';
import { IoMdArrowDropdown } from 'react-icons/io';

function Navbar() {
    const { user } = useSelector((state) => state.userStore);
    const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
    useLockScroll(openBurgerMenu);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isSmallScreen = useIsSmallScreen();
    const [isDashboardSidebar, setIsDashboardSidebar] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsDashboardSidebar(location.pathname.includes('/dashboard'));
    }, [location.pathname, setIsDashboardSidebar]);

    const logoutUser = () => {
        setOpenBurgerMenu(false);
        navigate(routesConfig.LOGIN.path, { replace: true });
        dispatch(logout());
    };

    return (
        <header className="container mx-auto px-[16px] sticky top-0 mt-[15px] z-10 bg-white">
            <div className={`box flex items-center justify-between mb-[40px]`}>
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
                                    <Link to={routesConfig.DASHBOARD_ROOT.path}>
                                        <img src={user.image} alt="avatar" className="w-[45px] h-[45px] rounded-full border object-cover" />
                                    </Link>

                                    <button className={`p-[10px] text-[30px] text-mainBlue`} onClick={() => setOpenBurgerMenu(true)}>
                                        <GiHamburgerMenu />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <NavLink
                                            to={routesConfig.POST.path}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? `border border-mainBlue p-[8px] rounded-[10px] uppercase text-mainBlue font-bold`
                                                    : `border border-mainBlue p-[8px] rounded-[10px] uppercase`
                                            }
                                        >
                                            Posts
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to={'/member'}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? `border border-mainBlue p-[8px] rounded-[10px] uppercase text-mainBlue font-bold`
                                                    : `border border-mainBlue p-[8px] rounded-[10px] uppercase`
                                            }
                                        >
                                            Members
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to={routesConfig.DASHBOARD_ROOT.path}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? `border border-mainBlue p-[8px] rounded-[10px] uppercase text-mainBlue font-bold`
                                                    : `border border-mainBlue p-[8px] rounded-[10px] uppercase`
                                            }
                                        >
                                            Dashboard
                                        </NavLink>
                                    </li>
                                    <li>
                                        <Button className="border border-mainBlue p-[8px] rounded-[10px] uppercase" onClick={logoutUser}>
                                            Log out
                                        </Button>
                                    </li>
                                    <li>
                                        <Link to={routesConfig.DASHBOARD_ROOT.path} onClick={() => setOpenBurgerMenu(false)}>
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
                                <button className={`p-[10px] text-[30px] text-mainBlue`} onClick={() => setOpenBurgerMenu(true)}>
                                    <GiHamburgerMenu />
                                </button>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink
                                        to={routesConfig.LOGIN.path}
                                        className={({ isActive }) =>
                                            isActive
                                                ? `border border-mainBlue p-[8px] rounded-[10px] uppercase text-mainBlue font-bold`
                                                : `border border-mainBlue p-[8px] rounded-[10px] uppercase`
                                        }
                                    >
                                        Login
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to={routesConfig.REGISTER.path}
                                        className={({ isActive }) =>
                                            isActive
                                                ? `border border-mainBlue p-[8px] rounded-[10px] uppercase text-mainBlue font-bold`
                                                : `border border-mainBlue p-[8px] rounded-[10px] uppercase`
                                        }
                                    >
                                        Register
                                    </NavLink>
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
                            onClick={() => {
                                setOpenBurgerMenu(false);
                                setIsDashboardSidebar(false);
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                        {/* Burger menu */}
                        <motion.div
                            className="fixed top-0 right-0 h-screen w-[180px] bg-mainBlue text-white z-40 p-5 flex flex-col gap-6 rounded-l-sm"
                            variants={{ hidden: { x: 180 }, visible: { x: 0 } }}
                            initial={'hidden'}
                            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                            animate={'visible'}
                            exit={'hidden'}
                        >
                            {user ? (
                                <ul className="flex flex-col text-lg gap-6 mt-[20px]">
                                    <li
                                        className="text-white text-[30px]"
                                        onClick={() => {
                                            setOpenBurgerMenu(false);
                                            setIsDashboardSidebar(false);
                                        }}
                                    >
                                        <FaArrowRight className="mx-auto" />
                                    </li>
                                    <li className="w-full">
                                        <NavLink
                                            to={routesConfig.POST.path}
                                            className="block border-2 uppercase font-medium border-white rounded-md p-[4px] text-center w-full"
                                            onClick={() => setOpenBurgerMenu(false)}
                                        >
                                            Posts
                                        </NavLink>
                                    </li>
                                    <li className="w-full">
                                        <NavLink
                                            to={'/member'}
                                            className="block border-2 uppercase font-medium border-white rounded-md p-[4px] text-center w-full"
                                            onClick={() => setOpenBurgerMenu(false)}
                                        >
                                            Members
                                        </NavLink>
                                    </li>
                                    <li
                                        className="w-full flex flex-col items-end"
                                        onClick={() => setIsDashboardSidebar(!isDashboardSidebar)}
                                    >
                                        <button className="flex items-center gap-1 border-2 uppercase font-medium border-white rounded-md p-[4px] text-center w-full">
                                            Dashboard{' '}
                                            <motion.span
                                                animate={{ rotate: isDashboardSidebar ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="inline-block"
                                            >
                                                <IoMdArrowDropdown />
                                            </motion.span>
                                        </button>
                                        <AnimatePresence>
                                            {isDashboardSidebar && (
                                                <motion.div
                                                    className="w-[80%] overflow-hidden"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                >
                                                    <ul className="flex flex-col mt-[5px] gap-[3px]">
                                                        <li onClick={() => setOpenBurgerMenu(false)} className="w-full">
                                                            <Link
                                                                to={routesConfig.DASHBOARD_ROOT.path}
                                                                className="border-2 text-sm border-white rounded-md px-[4px] text-center block"
                                                            >
                                                                Home
                                                            </Link>
                                                        </li>
                                                        <li onClick={() => setOpenBurgerMenu(false)}>
                                                            <Link
                                                                to={routesConfig.DASHBOARD_PROFILE.realPath(user?._id)}
                                                                className="border-2 text-sm border-white rounded-md px-[4px] text-center block"
                                                            >
                                                                Profile
                                                            </Link>
                                                        </li>
                                                        <li onClick={() => setOpenBurgerMenu(false)}>
                                                            <Link
                                                                to={routesConfig.DASHBOARD_POSTS.realPath(user?._id)}
                                                                className="border-2 text-sm border-white rounded-md px-[4px] text-center block"
                                                            >
                                                                My posts
                                                            </Link>
                                                        </li>
                                                        <li onClick={() => setOpenBurgerMenu(false)}>
                                                            <Link
                                                                to={routesConfig.DASHBOARD_REACTIONS.realPath(user?._id)}
                                                                className="border-2 text-sm border-white rounded-md px-[4px] text-center block"
                                                            >
                                                                My reactions
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </li>
                                    <li className="border-2 uppercase font-medium border-white rounded-md text-center">
                                        <Button className="uppercase p-[4px] m-0 text-lg" onClick={logoutUser}>
                                            Log out
                                        </Button>
                                    </li>
                                </ul>
                            ) : (
                                <ul className="flex flex-col text-lg gap-6 mt-[20px]">
                                    <li className="text-white text-[30px]" onClick={() => setOpenBurgerMenu(false)}>
                                        <FaArrowRight className="mx-auto" />
                                    </li>
                                    <li className="w-full">
                                        <NavLink
                                            to={routesConfig.LOGIN.path}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? `block border-2 uppercase font-medium border-white rounded-md p-[4px] text-center w-full bg-white text-mainBlue`
                                                    : `block border-2 uppercase font-medium border-white rounded-md p-[4px] text-center w-full`
                                            }
                                            onClick={() => setOpenBurgerMenu(false)}
                                        >
                                            Login
                                        </NavLink>
                                    </li>
                                    <li className="w-full">
                                        <NavLink
                                            to={routesConfig.REGISTER.path}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? `block border-2 uppercase font-medium border-white rounded-md p-[4px] text-center w-full bg-white text-mainBlue`
                                                    : `block border-2 uppercase font-medium border-white rounded-md p-[4px] text-center w-full`
                                            }
                                            onClick={() => setOpenBurgerMenu(false)}
                                        >
                                            Register
                                        </NavLink>
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
