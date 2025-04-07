import React from 'react';
import registerImg from '../assets/register.jpg';
import RegisterForm from '../components/RegisterForm';

function RegisterPage() {
    return (
        <div className="container mx-auto">
            <div className="flex flex-col gap-[20px] lg:flex-row px-[16px] items-stretch">
                <div className="w-full lg:w-[50%]">
                    <img
                        src={registerImg}
                        alt="register"
                        className="w-full h-full object-cover rounded-[10px] border border-mainBlue shadow-custom"
                    />
                </div>
                <div className="w-full gap-[10px] lg:w-[50%] flex flex-col lg:justify-between">
                    <div className="box text-center text-2xl uppercase">
                        <h3>Register</h3>
                    </div>
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
