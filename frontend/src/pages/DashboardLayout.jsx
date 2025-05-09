import { Link, Outlet } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';

function DashboardLayout() {
    return (
        <div className="container mx-auto">
            <div className="px-4 flex gap-[15px] mb-8">
                <div className="hidden md:w-[12%] md:block">
                    <DashboardSidebar />
                </div>
                <div className="w-full md:w-[88%]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;
