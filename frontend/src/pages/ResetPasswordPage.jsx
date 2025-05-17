import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { showLoader } from '../store/loaderSlice';
import { resetPassword } from '../services/authService';

function ResetPasswordPage() {
    const { resetToken } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchToken = async () => {
            dispatch(showLoader(true));
            const res = await resetPassword(resetToken);
            dispatch(showLoader(false));
            console.log(res, 'res sa fronta reset password');
        };
        fetchToken();
    }, []);
    return <div>ResetPasswordPage</div>;
}

export default ResetPasswordPage;
