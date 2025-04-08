import React from 'react';
import Button from './Button';
import Label from './Label';
import Input from './Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from '../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '../config/routesConfig';

function RegisterForm() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First Name is required').min(2, 'First name must be at least 2 characters'),
            lastName: Yup.string().required('Last Name is required').min(2, 'Last name must be at least 2 characters'),
            email: Yup.string()
                .required('Email is required')
                .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Email is not valid'),
            password: Yup.string().required('Password is required').min(4),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm is required'),
        }),
        onSubmit: async (values) => {
            const res = await register(values);
            if (res.status === 'success') {
                formik.resetForm();
                toast(res.message, {
                    type: 'success',
                    toastId: 1,
                });
                navigate(routesConfig.LOGIN.path);
            } else {
                toast(res.message, {
                    type: 'error',
                    toastId: 1,
                });
            }
        },
    });

    const showErrors = (inputName) => formik.errors[inputName] && formik.touched[inputName] && formik.errors[inputName];
    return (
        <form className="box flex flex-col gap-[5px]" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col">
                <Label className={`px-[12px] ${showErrors('firstName') && 'text-red-600'}`}>
                    {showErrors('firstName') ? showErrors('firstName') : 'First Name'}
                </Label>
                <Input
                    placeholder={'First name'}
                    className={'py-[6px] px-[12px] border rounded-[6px] outline-none'}
                    type={'text'}
                    id={'firstName'}
                    name={'firstName'}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                />
            </div>
            <div className="flex flex-col">
                <Label className={`px-[12px] ${showErrors('lastName') && 'text-red-600'}`}>
                    {showErrors('lastName') ? showErrors('lastName') : 'Last Name'}
                </Label>
                <Input
                    placeholder={'Last name'}
                    className={'py-[6px] px-[12px] border rounded-[6px] outline-none'}
                    type={'text'}
                    id={'lastName'}
                    name={'lastName'}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                />
            </div>
            <div className="flex flex-col">
                <Label className={`px-[12px] ${showErrors('email') && 'text-red-600'}`}>
                    {showErrors('email') ? showErrors('email') : 'Email'}
                </Label>
                <Input
                    placeholder={'Email'}
                    className={'py-[6px] px-[12px] border rounded-[6px] outline-none'}
                    type={'email'}
                    id={'email'}
                    name={'email'}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
            </div>
            <div className="flex flex-col">
                <Label className={`px-[12px] ${showErrors('password') && 'text-red-600'}`}>
                    {showErrors('password') ? showErrors('password') : 'Password'}
                </Label>
                <Input
                    placeholder={'Password'}
                    className={'py-[6px] px-[12px] border rounded-[6px] outline-none'}
                    type={'password'}
                    id={'password'}
                    name={'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
            </div>
            <div className="flex flex-col">
                <Label className={`px-[12px] ${showErrors('confirmPassword') && 'text-red-600'}`}>
                    {showErrors('confirmPassword') ? showErrors('confirmPassword') : 'Confirm password'}
                </Label>
                <Input
                    placeholder={'Confirm password'}
                    className={'py-[6px] px-[12px] border rounded-[6px] outline-none'}
                    type={'password'}
                    id={'confirmPassword'}
                    name={'confirmPassword'}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                />
            </div>
            <Button
                className={
                    'w-[100%] bg-mainBlue text-white py-[6px] px-[12px] rounded-[6px] hover:bg-darkBlue transition duration-300 ease-in-out outline-none'
                }
                type={'submit'}
            >
                Register
            </Button>
        </form>
    );
}

export default RegisterForm;
