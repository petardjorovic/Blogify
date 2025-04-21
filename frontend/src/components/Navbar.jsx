import React from 'react';
import logo from '../assets/logo.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { routesConfig } from '../config/routesConfig';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userSlice';

function Navbar() {
    const { user } = useSelector((state) => state.userStore);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutUser = () => {
        navigate(routesConfig.LOGIN.path, { replace: true });
        dispatch(logout());
    };
    return (
        <header className="container mx-auto px-[16px]">
            <div className="box flex items-center justify-between mt-[15px] mb-[40px]">
                <div className="flex items-center gap-[5px]">
                    <Link to={routesConfig.POST.path}>
                        <img src={logo} alt="logo" className="w-[50px]" />
                    </Link>
                    <p className="text-base">SocialNet</p>
                </div>
                <nav className="flex">
                    <ul className="flex gap-[10px] items-center">
                        {user ? (
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
                                    <Link to={routesConfig.DASHBOARD.path}>
                                        <img
                                            src={user.image.includes('uploads') ? `http://localhost:4000/${user.image}` : user.image}
                                            alt="avatar"
                                            className="w-[45px] h-[45px] rounded-full border object-cover"
                                        />
                                    </Link>
                                </li>
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
        </header>
    );
}

export default Navbar;
