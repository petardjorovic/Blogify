import React, { useState } from 'react';
import { routesConfig } from '../config/routesConfig';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function DashboardSidebar() {
    const { user } = useSelector((state) => state.userStore);
    const [activePage, setActivePage] = useState('Home');

    return (
        <ul className="flex flex-col gap-3">
            <li className="w-full">
                <Link
                    to={routesConfig.DASHBOARD_ROOT.path}
                    className={`box cursor-pointer text-center w-full block ${
                        activePage === 'Home' && 'bg-mainBlue text-white font-semibold'
                    }`}
                    onClick={() => setActivePage('Home')}
                >
                    Home
                </Link>
            </li>
            <li className="w-full">
                <Link
                    to={routesConfig.DASHBOARD_PROFILE.realPath(user?._id)}
                    onClick={() => setActivePage('Profile')}
                    className={`box cursor-pointer text-center w-full block ${
                        activePage === 'Profile' && 'bg-mainBlue text-white font-semibold'
                    }`}
                >
                    Profile
                </Link>
            </li>
            <li className="w-full">
                <Link
                    to={routesConfig.DASHBOARD_POSTS.realPath(user?._id)}
                    onClick={() => setActivePage('My posts')}
                    className={`box cursor-pointer text-center w-full block ${
                        activePage === 'My posts' && 'bg-mainBlue text-white font-semibold'
                    }`}
                >
                    My posts
                </Link>
            </li>
            <li className="w-full">
                <Link
                    to={routesConfig.DASHBOARD_REACTIONS.realPath(user?._id)}
                    onClick={() => setActivePage('My reactions')}
                    className={`box cursor-pointer text-center w-full block ${
                        activePage === 'My reactions' && 'bg-mainBlue text-white font-semibold'
                    }`}
                >
                    My reactions
                </Link>
            </li>
        </ul>
    );
}

export default DashboardSidebar;
