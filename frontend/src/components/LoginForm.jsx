import Label from './Label';
import Input from './Input';
import Button from './Button';
import { login } from '../services/authService';
import { toast } from 'react-toastify';
import { localStorageConfig } from '../config/localStorageConfig';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { routesConfig } from '../config/routesConfig';
import { useDispatch } from 'react-redux';
import { showLoader } from '../store/loaderSlice';
import { setUser } from '../store/userSlice';

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Email is required')
                .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Email is not valid'),
            password: Yup.string().required('Password is required').min(4, 'Password must be at least 4 characters'),
        }),
        onSubmit: async (values) => {
            dispatch(showLoader(true));
            const res = await login(values);
            dispatch(showLoader(false));

            if (res.status === 'success') {
                localStorage.setItem(localStorageConfig.TOKEN, `Bearer ${res.token}`);
                dispatch(setUser(res.user));
                // toast(res.message, {
                //     type: 'success',
                //     toastId: 1,
                // });
                navigate(routesConfig.POST.path);
                formik.resetForm();
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
        <form className="box flex flex-col gap-[15px]" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col">
                <Label className={`px-[12px] ${showErrors('email') && 'text-red-600'}`}>
                    {showErrors('email') ? showErrors('email') : 'Email'}
                </Label>
                <Input
                    placeholder={'Email'}
                    className={'py-[6px] px-[12px] border rounded-[6px] outline-none'}
                    type={'email'}
                    onChange={formik.handleChange}
                    id={'email'}
                    value={formik.values.email}
                    name={'email'}
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
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    name={'password'}
                />
            </div>

            <Button
                className={
                    'w-[100%] bg-mainBlue text-white py-[6px] px-[12px] rounded-[6px] hover:bg-darkBlue transition duration-300 ease-in-out'
                }
            >
                Login
            </Button>
        </form>
    );
}

export default LoginForm;
