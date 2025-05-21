import { Outlet } from 'react-router-dom';
import SearchFormMember from '../components/SearchFormMember';
import MemberDetails from '../components/MemberDetails';

function MemberLayout() {
    return (
        <div className="container mx-auto px-4">
            <Outlet />
        </div>
    );
}

export default MemberLayout;
