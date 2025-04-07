import { useState } from 'react';
import Label from './Label';
import Input from './Input';
import Button from './Button';
import { login } from '../services/authService';
import { toast } from 'react-toastify';
import { localStorageConfig } from '../config/localStorageConfig';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await login(data);
        if (res.status === 'success') {
            localStorage.setItem(localStorageConfig.TOKEN, `Bearer ${res.token}`);
            toast.success(res.message);
            navigate('/posts');
        } else {
            toast.error(res.message);
        }
    };

    return (
        <form className="box flex flex-col gap-[15px]" onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <Label className={'px-[12px]'}>Email</Label>
                <Input
                    placeholder={'Email'}
                    className={'py-[6px] px-[12px] border rounded-[6px] outline-none'}
                    type={'email'}
                    onChange={handleChange}
                    id={'email'}
                    value={data.email}
                />
            </div>
            <div className="flex flex-col">
                <Label className={'px-[12px]'}>Password</Label>
                <Input
                    placeholder={'Password'}
                    className={'py-[6px] px-[12px] border rounded-[6px] outline-none'}
                    type={'password'}
                    id={'password'}
                    onChange={handleChange}
                    value={data.password}
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
