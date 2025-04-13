import { Outlet } from 'react-router-dom';
import './config/axiosConfig';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import { useSelector } from 'react-redux';

function App() {
    const { loader } = useSelector((state) => state.loaderStore);

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
