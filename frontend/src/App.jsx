import { Outlet } from 'react-router-dom';
import './config/axiosConfig';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Loader from './components/Loader';

function App() {
    return (
        <>
            {/* <Loader /> */}
            <Navbar />
            <Outlet />
            <ToastContainer />
        </>
    );
}

export default App;
