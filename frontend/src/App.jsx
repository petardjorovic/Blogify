import { Outlet } from 'react-router-dom';
import './config/axiosConfig';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { logout, setUser } from './store/userSlice';
import { localStorageConfig } from './config/localStorageConfig';
import { fetchUserFromToken } from './services/authService';

function App() {
    const { loader } = useSelector((state) => state.loaderStore);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetchUserFromToken();
            if (res.status === 'success') {
                dispatch(setUser(res.user));
            } else {
                dispatch(logout());
            }
        };
        if (localStorage.getItem(localStorageConfig.TOKEN)) {
            fetchUser();
        }
    }, [dispatch]);

    return (
        <>
            {loader && <Loader />}
            <Navbar />
            <Outlet />
            <ToastContainer />
        </>
    );
}

export default App;
