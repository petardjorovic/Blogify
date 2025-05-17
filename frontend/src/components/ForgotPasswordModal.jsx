import React, { useEffect, useState } from 'react';
import Label from './Label';
import Input from './Input';
import { IoClose } from 'react-icons/io5';
import { FocusTrap } from 'focus-trap-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { showLoader } from '../store/loaderSlice';
import { forgotPassword } from '../services/authService';

function ForgotPasswordModal({ setIsForgotPasswordModal }) {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Email is not valid')
                .required('Email is required'),
        }),
        onSubmit: async (values) => {
            console.log(values);
            dispatch(showLoader(true));
            const res = await forgotPassword(values);
            dispatch(showLoader(false));
            console.log(res, 'res sa fronta forgot password');
        },
    });

    const showErrors = (inputValue) => formik.errors[inputValue] && formik.touched[inputValue] && formik.errors[inputValue];

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                setIsForgotPasswordModal(false);
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [setIsForgotPasswordModal]);

    return (
        <FocusTrap>
            <div
                className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-70 z-50 fixed top-0 left-0 px-[16px] transition-all duration-300 ease-out"
                onClick={() => setIsForgotPasswordModal(false)}
            >
                <div
                    className="relative p-6 rounded-2xl text-center bg-white shadow-lg w-[320px] animate-fadeInScale"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[22px] p-1.5 ml-auto inline-flex items-center"
                        onClick={() => setIsForgotPasswordModal(false)}
                    >
                        <IoClose />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 mb-2">Forgot your password?</h1>
                    <p className="text-sm text-gray-600 mb-4">
                        We'll email you a link to reset your password. Link will be valid only for 10 minutes.
                    </p>
                    <form onSubmit={formik.handleSubmit} className="flex flex-col items-center gap-[20px] justify-center mt-[10px]">
                        <div className="flex flex-col items-start w-full">
                            <Label htmlFor={'email'} className={`px-[12px] ${showErrors('email') && 'text-red-600'}`}>
                                {showErrors('email') ? showErrors('email') : 'Email'}
                            </Label>
                            <Input
                                id={'email'}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                placeholder={'example@email.com'}
                                className={`border px-3 py-2 rounded-md w-full outline-none border-gray-300 focus:ring-2 focus:ring-blue-500 ${
                                    showErrors('email') && 'border-red-600'
                                }`}
                            />
                        </div>
                        <div className="flex justify-end gap-x-2 mt-4">
                            <button
                                onClick={() => setIsForgotPasswordModal(false)}
                                className="py-2 px-4 text-sm font-medium text-gray-600 bg-white rounded-md border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 transition"
                            >
                                Cancel
                            </button>{' '}
                            <button
                                type="submit"
                                className="py-2 px-4 text-sm font-medium text-center text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition"
                            >
                                Send me a link
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </FocusTrap>
    );
}

export default ForgotPasswordModal;
