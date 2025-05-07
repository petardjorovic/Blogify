import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { showLoader } from '../store/loaderSlice';
import { checkUserActivation } from '../services/authService';
import { routesConfig } from '../config/routesConfig';
import Loader from '../components/Loader';
import { CheckCircle, AlertTriangle } from 'lucide-react';

function ActivationUserPage() {
    const { loader } = useSelector((state) => state.loaderStore);
    const [message, setMessage] = useState(null);
    const { activationToken } = useParams();
    const dispatch = useDispatch();
    const [destination, setDestination] = useState('Login');
    const [counter, setCounter] = useState(10);

    useEffect(() => {
        let intervalTimer;
        const checkToken = async () => {
            dispatch(showLoader(true));
            const res = await checkUserActivation(activationToken);
            dispatch(showLoader(false));

            if (res.status === 'success') {
                setMessage(res.message);
                setDestination('Login');
            } else if (res.status === 'info') {
                setMessage(res.message);
                setDestination('Login');
            } else {
                setDestination('Register');
                setMessage('Your activation link expired, please resend activation link to your email address');
            }
        };

        // pokrece odbrojavanje
        intervalTimer = setInterval(() => {
            setCounter((prev) => prev - 1);
        }, 1000);

        checkToken();

        return () => {
            if (intervalTimer) clearInterval(intervalTimer);
        };
    }, [activationToken, dispatch]);

    useEffect(() => {
        if (counter <= 0) {
            setCounter(0); // sugurnost
        }
    }, [counter]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Account Activation</h1>

                <div className="flex justify-center mb-4">
                    {destination === 'Login' ? (
                        <CheckCircle className="text-green-500 w-12 h-12" />
                    ) : (
                        <AlertTriangle className="text-yellow-500 w-12 h-12" />
                    )}
                </div>

                <p className="text-gray-700 mb-2">{message}</p>

                <p className="text-sm text-gray-500 mb-4">
                    You will be redirected to the <span className="font-medium text-gray-700">{destination}</span> page in{' '}
                    <span className="font-semibold text-gray-800">{counter}</span> {counter === 1 ? 'second' : 'seconds'}.
                </p>

                {loader && <Loader />}
                {counter <= 0 &&
                    (destination === 'Login' ? (
                        <Navigate to={routesConfig.LOGIN.path} replace={true} />
                    ) : (
                        <Navigate to={routesConfig.REGISTER.path} replace={true} />
                    ))}
            </div>
        </div>
    );
}

export default ActivationUserPage;
