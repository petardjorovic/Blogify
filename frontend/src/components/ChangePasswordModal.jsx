import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Label from './Label';
import Input from './Input';
import { FocusTrap } from 'focus-trap-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { showLoader } from '../store/loaderSlice';
import { changePassword } from '../services/authService';
import { toast } from 'react-toastify';
import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '../config/routesConfig';

function ChangePasswordModal({ setIsChangePasswordModal }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        validationSchema: Yup.object({
            currentPassword: Yup.string().required('Current password is required').min(4, 'Minimum length is 4 characters'),
            newPassword: Yup.string().required('New password is required').min(4, 'Minimum length is 4 characters'),
            confirmNewPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'New Passwords must match')
                .required('Confirm new password is required')
                .min(4, 'Minimum length is 4 characters'),
        }),
        onSubmit: async (values) => {
            dispatch(showLoader(true));
            const res = await changePassword(values);
            dispatch(showLoader(false));
            if (res.status === 'success') {
                setIsChangePasswordModal(false);
                toast.success(res.message);
                dispatch(logout());
                navigate(routesConfig.LOGIN.path);
            } else {
                toast.error(res.message);
                setIsChangePasswordModal(false);
            }
        },
    });

    const showErrors = (inputName) => formik.errors[inputName] && formik.touched[inputName] && formik.errors[inputName];

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                setIsChangePasswordModal(false);
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [setIsChangePasswordModal]);

    return (
        <FocusTrap>
            <div
                className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-70 z-40 fixed top-0 left-0 px-[16px] transition-all duration-300 ease-out"
                onClick={() => setIsChangePasswordModal(false)}
            >
                <div
                    className="relative p-6 rounded-2xl text-center bg-white shadow-lg w-[320px] animate-fadeInScale"
                    onClick={(e) => e.stopPropagation()} // spreči da klik unutar modala zatvori modal
                >
                    <button
                        className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[22px] p-1.5 ml-auto inline-flex items-center"
                        onClick={() => setIsChangePasswordModal(false)}
                    >
                        <IoClose />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 mb-2">Change password</h1>
                    <form onSubmit={formik.handleSubmit} className="flex flex-col items-center gap-[8px] justify-center mt-[10px]">
                        <div className="flex flex-col items-start w-full">
                            <Label htmlFor={'currentPassword'} className={`px-[12px] ${showErrors('currentPassword') && 'text-red-600'}`}>
                                {showErrors('currentPassword') ? showErrors('currentPassword') : 'Current Password'}
                            </Label>
                            <Input
                                id={'currentPassword'}
                                name={'currentPassword'}
                                onChange={formik.handleChange}
                                value={formik.values.currentPassword}
                                placeholder={'Current password'}
                                type={'password'}
                                className={`border px-3 py-1 rounded-[4px] w-full outline-none border-gray-300 focus:ring-2 focus:ring-blue-500 ${
                                    showErrors('currentPassword') && 'border-red-600'
                                }`}
                            />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <Label htmlFor={'newPassword'} className={`px-[12px] ${showErrors('newPassword') && 'text-red-600'}`}>
                                {showErrors('newPassword') ? showErrors('newPassword') : 'New Password'}
                            </Label>
                            <Input
                                id={'newPassword'}
                                name={'newPassword'}
                                onChange={formik.handleChange}
                                value={formik.values.newPassword}
                                placeholder={'New password'}
                                type={'password'}
                                className={`border px-3 py-1 rounded-[4px] w-full outline-none border-gray-300 focus:ring-2 focus:ring-blue-500 ${
                                    showErrors('newPassword') && 'border-red-600'
                                }`}
                            />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <Label
                                htmlFor={'confirmNewPassword'}
                                className={`px-[12px] ${showErrors('confirmNewPassword') && 'text-red-600'}`}
                            >
                                {showErrors('confirmNewPassword') ? showErrors('confirmNewPassword') : 'Confirm New Password'}
                            </Label>
                            <Input
                                id={'confirmNewPassword'}
                                name={'confirmNewPassword'}
                                onChange={formik.handleChange}
                                value={formik.values.confirmNewPassword}
                                placeholder={'Confirm new password'}
                                type={'password'}
                                className={`border px-3 py-1 rounded-[4px] w-full outline-none border-gray-300 focus:ring-2 focus:ring-blue-500 ${
                                    showErrors('confirmNewPassword') && 'border-red-600'
                                }`}
                            />
                        </div>
                        <div className="flex justify-end gap-x-2 mt-4">
                            <button
                                onClick={() => setIsChangePasswordModal(false)}
                                className="py-2 px-4 text-sm font-medium text-gray-600 bg-white rounded-md border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 transition"
                            >
                                Cancel
                            </button>{' '}
                            <button
                                type="submit"
                                className="py-2 px-4 text-sm font-medium text-center text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </FocusTrap>
    );
}

export default ChangePasswordModal;
