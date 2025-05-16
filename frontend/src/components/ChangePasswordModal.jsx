import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Label from './Label';
import Input from './Input';
import { FocusTrap } from 'focus-trap-react';

function ChangePasswordModal({ setIsChangePasswordModal }) {
    const [data, setData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                setIsChangePasswordModal(false);
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [setIsChangePasswordModal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data, 'data');
    };
    return (
        <FocusTrap>
            <div
                className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-70 z-50 fixed top-0 left-0 px-[16px] transition-all duration-300 ease-out"
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
                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[8px] justify-center mt-[10px]">
                        <div className="flex flex-col items-start w-full">
                            <Label htmlFor={'currentPassword'} className={'px-[12px]'}>
                                Current password
                            </Label>
                            <Input
                                id={'currentPassword'}
                                name={'currentPassword'}
                                onChange={handleChange}
                                value={data.currentPassword}
                                placeholder={'Current password'}
                                type={'password'}
                                className={
                                    'border px-3 py-1 rounded-[4px] w-full outline-none border-gray-300 focus:ring-2 focus:ring-blue-500'
                                }
                            />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <Label htmlFor={'newPassword'} className={'px-[12px]'}>
                                New password
                            </Label>
                            <Input
                                id={'newPassword'}
                                name={'newPassword'}
                                onChange={handleChange}
                                value={data.newPassword}
                                placeholder={'New password'}
                                type={'password'}
                                className={
                                    'border px-3 py-1 rounded-[4px] w-full outline-none border-gray-300 focus:ring-2 focus:ring-blue-500'
                                }
                            />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <Label htmlFor={'confirmNewPassword'} className={'px-[12px]'}>
                                Confirm new password
                            </Label>
                            <Input
                                id={'confirmNewPassword'}
                                name={'confirmNewPassword'}
                                onChange={handleChange}
                                value={data.confirmNewPassword}
                                placeholder={'Confirm new password'}
                                type={'password'}
                                className={
                                    'border px-3 py-1 rounded-[4px] w-full outline-none border-gray-300 focus:ring-2 focus:ring-blue-500'
                                }
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
