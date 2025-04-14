import { Outlet } from 'react-router-dom';
import './config/axiosConfig';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { restoreUser } from './store/userSlice';

function App() {
    const { loader } = useSelector((state) => state.loaderStore);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(restoreUser());
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
