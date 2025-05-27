import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { showLoader } from '../store/loaderSlice';
import { resetPassword } from '../services/authService';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Label from '../components/Label';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { toast, ToastContainer } from 'react-toastify';
import { routesConfig } from '../config/routesConfig';

function ResetPasswordPage() {
    const { resetToken } = useParams();
    const { loader } = useSelector((state) => state.loaderStore);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmNewPassword: '',
        },
        validationSchema: Yup.object({
            newPassword: Yup.string().min(4, 'Minimum length is 4 characters').required('New password is required'),
            confirmNewPassword: Yup.string()
                .required('Confirm new password is required')
                .min(4, 'Minimum length is 4 characters')
                .oneOf([Yup.ref('newPassword'), null], 'New passwords must match'),
        }),
        onSubmit: async (values) => {
            dispatch(showLoader(true));
            const res = await resetPassword(values, resetToken);
            dispatch(showLoader(false));
            if (res.status === 'success') {
                toast.success(res.message);
                setTimeout(() => {
                    navigate(routesConfig.LOGIN.path);
                }, 10000);
            } else {
                toast.error(res.message);
                setTimeout(() => {
                    navigate(routesConfig.LOGIN.path);
                }, 10000);
            }
        },
    });

    const showErrors = (inputValue) => formik.errors[inputValue] && formik.touched[inputValue] && formik.errors[inputValue];

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Reset Your Password</h2>
                <p className="text-sm text-gray-500 text-center mb-6">Enter your new password below.</p>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <Label htmlFor={'newPassword'} className={`px-3 ${showErrors('newPassword') && 'text-red-600'}`}>
                            {showErrors('newPassword') ? showErrors('newPassword') : 'New Password'}
                        </Label>
                        <Input
                            type={'password'}
                            placeholder={'Enter new password'}
                            id={'newPassword'}
                            className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                showErrors('newPassword') && 'focus:ring-red-500 border-red-600'
                            }`}
                            onChange={formik.handleChange}
                            value={formik.values.newPassword}
                        />
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor={'confirmNewPassword'} className={`${showErrors('confirmNewPassword') && 'text-red-600'}`}>
                            {showErrors('confirmNewPassword') ? showErrors('confirmNewPassword') : 'Confirm New Password'}
                        </Label>
                        <Input
                            type={'password'}
                            placeholder={'Confirm new password'}
                            id={'confirmNewPassword'}
                            className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                showErrors('confirmNewPassword') && 'focus:ring-red-500 border-red-600'
                            }`}
                            onChange={formik.handleChange}
                            value={formik.values.confirmNewPassword}
                        />
                    </div>
                    <Button
                        className={
                            'w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-60'
                        }
                        type={'submit'}
                    >
                        Submit
                    </Button>
                </form>
                <div className="text-center mt-4">
                    <Link className="text-sm text-blue-600 hover:underline" to={routesConfig.LOGIN.path}>
                        ← Back to Login
                    </Link>
                </div>
            </div>
            {loader && <Loader />}
            <ToastContainer
                position="top-right"
                containerClassName="w-full flex justify-end" // centriranje i kontrola širine
                toastClassName="w-[60%] min-w-fit bg-white text-black shadow-md rounded-lg"
                style={{ top: '2rem' }}
            />
        </div>
    );
}

export default ResetPasswordPage;
