import { IoClose } from 'react-icons/io5';
import { FocusTrap } from 'focus-trap-react';
import InputField from './InputField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { showLoader } from '../store/loaderSlice';
import { changeEmail } from '../services/dashboardService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '../config/routesConfig';
import { logout } from '../store/userSlice';

function ChangeEmailModal({ setIsChangeEmailModal, userEmail }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            password: '',
            newEmail: '',
        },
        validationSchema: Yup.object({
            password: Yup.string().min(4, 'Minimum length is 4 characters.').required('Required.'),
            newEmail: Yup.string()
                .required('Required')
                .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Email is not valid')
                .trim()
                .test('is-different', 'New email must be different from current.', (value) => value !== userEmail),
        }),
        onSubmit: async (values) => {
            setIsChangeEmailModal(false);
            dispatch(showLoader(true));
            const res = await changeEmail(values);
            dispatch(showLoader(false));
            if (res.status === 'success') {
                toast.success(res.message);
                dispatch(logout());
                navigate(routesConfig.LOGIN.path, { replace: true });
            } else {
                toast.error(res.message);
            }
        },
    });

    return (
        <FocusTrap>
            <div
                className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-70 z-40 fixed top-0 left-0 px-[16px] transition-all duration-300 ease-out"
                onClick={() => setIsChangeEmailModal(false)}
            >
                <div
                    className="relative p-6 rounded-2xl text-center bg-white shadow-lg w-[320px] animate-fadeInScale"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[22px] p-1.5 ml-auto inline-flex items-center"
                        onClick={() => setIsChangeEmailModal(false)}
                    >
                        <IoClose />
                    </button>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Change Email</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        For security reasons, please enter your current password to confirm the email change.
                    </p>
                    <form onSubmit={formik.handleSubmit} className="flex flex-col items-center gap-2 justify-center mt-[10px]">
                        <InputField formik={formik} inputName={'password'} type={'password'} labelName={'Password'} />
                        <InputField formik={formik} inputName={'newEmail'} type={'newEmail'} labelName={'New Email'} />
                        <div className="flex justify-end gap-x-2 mt-4">
                            <button
                                onClick={() => setIsChangeEmailModal(false)}
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

export default ChangeEmailModal;
