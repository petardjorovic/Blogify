import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { showLoader } from '../store/loaderSlice';
import { checkUserActivation } from '../services/authService';

function ActivationUserPage() {
    const [message, setMessage] = useState(null);
    const { activationToken } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkToken = async () => {
            dispatch(showLoader(true));
            const res = await checkUserActivation(activationToken);
            dispatch(showLoader(false));
            console.log(res, 'res sa fronta checkToken');
        };
        checkToken();
    }, []);

    return <div>ActivationUserPage</div>;
}

export default ActivationUserPage;
