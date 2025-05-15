import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Label from './Label';
import Input from './Input';

function ChangeEmailModal({ setIsChangeEmailModal }) {
    const [data, setData] = useState({
        password: '',
        newEmail: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data, 'data');
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-70 z-50 fixed top-0 left-0 px-[16px] transition-all duration-300 ease-out">
            <div className="relative p-6 rounded-2xl text-center bg-white shadow-lg w-[320px] animate-fadeInScale">
                <button
                    className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[22px] p-1.5 ml-auto inline-flex items-center"
                    onClick={() => setIsChangeEmailModal(false)}
                >
                    <IoClose />
                </button>
                <h1 className="text-xl font-bold text-gray-800 mb-2">Change Email</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[8px] justify-center mt-[10px]">
                    <div className="flex flex-col items-start w-full">
                        <Label htmlFor={'password'} className={'px-[12px]'}>
                            Current password
                        </Label>
                        <Input
                            id={'password'}
                            name={'password'}
                            onChange={handleChange}
                            value={data.currentPassword}
                            placeholder={'Enter password'}
                            type={'password'}
                            className={'border px-3 py-2 rounded-md w-full outline-none border-gray-300 focus:ring-2 focus:ring-blue-500'}
                        />
                    </div>
                    <div className="flex flex-col items-start w-full">
                        <Label htmlFor={'newEmail'} className={'px-[12px]'}>
                            New email
                        </Label>
                        <Input
                            id={'newEmail'}
                            name={'newEmail'}
                            onChange={handleChange}
                            value={data.newEmail}
                            placeholder={'New email'}
                            type={'text'}
                            className={'border px-3 py-2 rounded-md w-full outline-none border-gray-300 focus:ring-2 focus:ring-blue-500'}
                        />
                    </div>
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
    );
}

export default ChangeEmailModal;
