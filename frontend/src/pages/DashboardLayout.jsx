import { Link, Outlet } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';

function DashboardLayout() {
    return (
        <div className="container mx-auto">
            <div className="px-4 flex gap-[20px]">
                <div className="hidden md:w-[10%] md:block box">
                    <DashboardSidebar />
                </div>
                <div className="w-full md:w-[90%] box">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;
