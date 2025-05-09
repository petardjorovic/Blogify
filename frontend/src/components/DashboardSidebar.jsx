import { routesConfig } from '../config/routesConfig';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

function DashboardSidebar() {
    const { user } = useSelector((state) => state.userStore);
    const location = useLocation();

    return (
        <ul className="flex flex-col gap-3 sticky top-[110px]">
            <li className="w-full">
                <Link
                    to={routesConfig.DASHBOARD_ROOT.path}
                    className={`border border-mainBlue rounded-[10px] px-2 py-2 shadow-custom md:text-sm lg:text-base cursor-pointer text-center w-full block ${
                        location.pathname === '/dashboard' && 'bg-mainBlue text-white'
                    }`}
                >
                    Home
                </Link>
            </li>
            <li className="w-full">
                <Link
                    to={routesConfig.DASHBOARD_PROFILE.realPath(user?._id)}
                    className={`border border-mainBlue rounded-[10px] px-2 py-2 shadow-custom md:text-sm lg:text-base cursor-pointer text-center w-full block ${
                        location.pathname.includes('/dashboard/profile') && 'bg-mainBlue text-white'
                    }`}
                >
                    Profile
                </Link>
            </li>
            <li className="w-full">
                <Link
                    to={routesConfig.DASHBOARD_POSTS.realPath(user?._id)}
                    className={`border border-mainBlue rounded-[10px] px-2 py-2 shadow-custom md:text-sm lg:text-base cursor-pointer text-center w-full block ${
                        location.pathname.includes('/dashboard/posts') && 'bg-mainBlue text-white'
                    }`}
                >
                    My posts
                </Link>
            </li>
            <li className="w-full">
                <Link
                    to={routesConfig.DASHBOARD_REACTIONS.realPath(user?._id)}
                    className={`border border-mainBlue rounded-[10px] px-2 py-2 shadow-custom md:text-sm lg:text-base cursor-pointer text-center w-full block ${
                        location.pathname.includes('/dashboard/reactions') && 'bg-mainBlue text-white'
                    }`}
                >
                    My reactions
                </Link>
            </li>
        </ul>
    );
}

export default DashboardSidebar;
