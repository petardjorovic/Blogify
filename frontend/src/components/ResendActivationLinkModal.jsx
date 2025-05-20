import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import InputField from '../components/InputField';
import { showLoader } from '../store/loaderSlice';
import { resendActivationLink } from '../services/authService';
import { toast } from 'react-toastify';

function ResendActivationLinkModal({ setIsModal }) {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Required')
                .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Email is not valid'),
        }),
        onSubmit: async (values) => {
            setIsModal(false);
            dispatch(showLoader(true));
            const res = await resendActivationLink(values);
            dispatch(showLoader(false));
            if (res.status === 'success') {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        },
    });

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                setIsModal(false);
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [setIsModal]);

    return (
        <div
            className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-70 z-40 fixed top-0 left-0 px-4 transition-all duration-300 ease-out"
            onClick={() => setIsModal(false)}
        >
            <div
                className="relative p-6 rounded-2xl text-center bg-white shadow-lg w-[320px] animate-fadeInScale"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[22px] p-1.5 ml-auto inline-flex items-center"
                    onClick={() => setIsModal(false)}
                >
                    <IoClose />
                </button>
                <h1 className="text-xl font-bold text-gray-800 mb-2">Activate your account</h1>
                <p className="text-sm text-gray-600 mb-4">It looks like your previous activation link has expired or wasn’t delivered.</p>
                <form onSubmit={formik.handleSubmit} className="flex flex-col w-full items-center gap-[20px] justify-center">
                    <InputField formik={formik} inputName={'email'} type={'text'} labelName={'Email'} />
                    <div className="flex justify-end gap-x-2 mt-4">
                        <button
                            type="submit"
                            onClick={() => setIsModal(false)}
                            className="py-2 px-4 text-sm font-medium text-gray-600 bg-white rounded-md border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 transition"
                        >
                            Cancel
                        </button>{' '}
                        <button
                            type="submit"
                            className="py-2 px-4 text-sm font-medium text-center text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition"
                        >
                            Send new link
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResendActivationLinkModal;
