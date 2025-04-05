import React, { useState } from 'react';
import Label from './Label';
import Input from './Input';
import Button from './Button';
import { PiUserFill } from 'react-icons/pi';
import { RiLockPasswordFill } from 'react-icons/ri';

function LoginForm() {
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data, 'data');
    };

    return (
        <div className="flex items-center justify-center flex-col gap-[20px]">
            <h2 className="text-5xl text-slate-950 font-semibold">Login</h2>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="bg-white bg-opacity-50 w-[300px] py-[10px] px-[15px] flex items-center gap-[12px]">
                    <span className="text-slate-950 opacity-100">
                        <PiUserFill />
                    </span>
                    <Input
                        placeholder={'Email'}
                        className={'bg-transparent text-slate-950 opacity-100 outline-none placeholder:text-slate-600'}
                        type={'email'}
                        onChange={handleChange}
                        id={'email'}
                        value={data.email}
                    />
                </div>
                <div className="bg-white bg-opacity-50 w-[300px] py-[10px] px-[15px] flex items-center gap-[12px] mt-[20px]">
                    <span className="text-slate-950">
                        <RiLockPasswordFill />
                    </span>
                    <Input
                        placeholder={'Password'}
                        className={'bg-transparent text-slate-950 opacity-100 outline-none placeholder:text-slate-600'}
                        type={'password'}
                        id={'password'}
                        onChange={handleChange}
                        value={data.password}
                    />
                </div>
                <div className="flex items-center justify-between mt-[10px]">
                    <div className="flex items-center gap-[3px]">
                        <Input
                            type={'checkbox'}
                            id={'rememberme'}
                            className="appearance-none w-3 h-3 border-2 border-gray-500 rounded-full checked:bg-slate-950 checked:border-transparent focus:outline-none"
                        />
                        <Label htmlFor={'rememberme'} className={'text-xs'}>
                            Remember me
                        </Label>
                    </div>

                    <p className="text-slate-700 text-xs self-end cursor-pointer hover:text-slate-950 transition-all duration-300 m-0">
                        Forgot password?
                    </p>
                </div>
                <Button
                    className={
                        'w-[300px] p-[10px] bg-white bg-opacity-80 text-slate-900 mt-[30px] rounded-full font-semibold hover:bg-opacity-100 transition duration-300 ease-in-out'
                    }
                >
                    Login
                </Button>
            </form>
        </div>
    );
}

export default LoginForm;
