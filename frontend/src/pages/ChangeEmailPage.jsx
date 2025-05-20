import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { showLoader } from '../store/loaderSlice';
import Loader from '../components/Loader';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { checkEmailChangeToken } from '../services/dashboardService';
import { routesConfig } from '../config/routesConfig';
import { toast, ToastContainer } from 'react-toastify';

function ChangeEmailPage() {
    const { loader } = useSelector((state) => state.loaderStore);
    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const expires = searchParams.get('expires');
    const isTokenExpired = expires && parseInt(expires) < Date.now();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkToken = async () => {
            if (isTokenExpired || !token) return;
            dispatch(showLoader(true));
            const res = await checkEmailChangeToken(token);
            dispatch(showLoader(false));

            if (res.status === 'success') {
                setMessage(res.message);
                toast.success(res.message);
            } else {
                toast.error(res.message);
                setErrorMessage('Your activation link expired, please resend activation link to your email address');
            }
        };

        checkToken();
    }, [token, dispatch, isTokenExpired]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">New Email Activation</h1>

                <div className="flex justify-center mb-4">
                    {message ? (
                        <CheckCircle className="text-green-500 w-12 h-12" />
                    ) : (
                        <AlertTriangle className="text-yellow-500 w-12 h-12" />
                    )}
                </div>

                {message ? (
                    <p className="text-gray-700 mb-2">{message}</p>
                ) : (
                    <p className="text-gray-700 mb-2">Your activation for new email is invalid or has expired.</p>
                )}
                <div className="text-center mt-4">
                    <Link className="text-sm text-blue-600 hover:underline" to={routesConfig.LOGIN.path}>
                        ← Back to Login
                    </Link>
                </div>
                {loader && <Loader />}
                <ToastContainer />
            </div>
        </div>
    );
}

export default ChangeEmailPage;
