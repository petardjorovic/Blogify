import { useDispatch } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { HiTrash } from 'react-icons/hi';
import { showLoader } from '../store/loaderSlice';
import { toast } from 'react-toastify';
import { deleteUserProfile } from '../services/dashboardService';
import Label from './Label';
import Input from './Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '../config/routesConfig';
import { useEffect } from 'react';
import { FocusTrap } from 'focus-trap-react';

function DeleteUserProfileModal({ setIsDeleteMemberModal }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: Yup.object({
            password: Yup.string().required('Password is required').min(4),
            // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)(?!.* ).{8,16}$/, 'Pass must contain...')
        }),
        onSubmit: async (values) => {
            setIsDeleteMemberModal(false);
            dispatch(showLoader(true));
            const res = await deleteUserProfile(values);
            dispatch(showLoader(false));
            if (res.status === 'success') {
                dispatch(logout());
                navigate(routesConfig.REGISTER.path, { replace: true });
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        },
    });

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                setIsDeleteMemberModal(false);
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [setIsDeleteMemberModal]);

    const showErrors = (inputName) => formik.errors[inputName] && formik.touched[inputName] && formik.errors[inputName];

    return (
        <FocusTrap>
            <div
                className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-70 z-50 fixed top-0 left-0 px-[16px] transition-all duration-300 ease-out"
                onClick={() => setIsDeleteMemberModal(false)}
            >
                <div
                    className="relative p-6 rounded-2xl text-center bg-white shadow-lg w-[320px] animate-fadeInScale"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[22px] p-1.5 ml-auto inline-flex items-center"
                        onClick={() => setIsDeleteMemberModal(false)}
                    >
                        <IoClose />
                    </button>
                    <form className="space-y-2" onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <h1 className="text-red-600 text-lg font-semibold">Delete Profile</h1>
                            <p className="text-sm text-muted-foreground mt-4 mb-4">
                                Are you sure you want to delete your profile? This action is{' '}
                                <span className="font-semibold text-destructive">permanent</span> and will remove all your data, including
                                posts, comments, and account settings.
                            </p>
                            <Label htmlFor="password" className={`${showErrors('password') && 'text-red-600 text-sm'}`}>
                                {showErrors('password') ? showErrors('password') : 'Enter your password to confirm:'}
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                className={`border px-3 py-1 outline-none rounded-md mt-[2px] ${
                                    showErrors('password') && 'border-red-600'
                                }`}
                                placeholder="••••••••"
                            />
                            <p className="text-xs text-destructive mt-2">
                                ⚠️ Once deleted, you will no longer be able to sign in with this account.
                            </p>
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                            <button
                                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10"
                                onClick={() => setIsDeleteMemberModal(false)}
                                type={'button'}
                            >
                                No, cancel
                            </button>
                            <button
                                className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 transition duration-300 ease-in-out"
                                // onClick={handleDeleteUserProfile}
                                type={'submit'}
                            >
                                Yes, I'm sure
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </FocusTrap>
    );
}

export default DeleteUserProfileModal;
