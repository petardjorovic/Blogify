import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import loginImg from '../assets/login.jpg';
import { Link } from 'react-router-dom';
import { routesConfig } from '../config/routesConfig';
import ForgotPasswordModal from '../components/ForgotPasswordModal';

function LoginPage() {
    const [isForgotPasswordModal, setIsForgotPasswordModal] = useState(false);
    return (
        <div className="container mx-auto">
            <div className="flex flex-col gap-[20px] lg:flex-row px-[16px] items-stretch">
                <div className="w-full lg:w-[50%]">
                    <img
                        src={loginImg}
                        alt="login"
                        className="w-full h-full object-cover rounded-[10px] border border-mainBlue shadow-custom"
                    />
                </div>

                <div className="w-full gap-[10px] lg:w-[50%] flex flex-col lg:justify-between">
                    <div className="box text-center text-2xl uppercase">
                        <h3>Login</h3>
                    </div>
                    <div className="box text-center">
                        <p>
                            Please <span className="font-bold">Login</span> to create your own memories and like others memories.
                        </p>
                    </div>
                    <LoginForm />
                    <div className="box">
                        <p className="text-center">
                            Forgot your password?{' '}
                            <span
                                onClick={() => setIsForgotPasswordModal(true)}
                                className="text-mainBlue font-bold cursor-pointer hover:text-violet-700 transition duration-300 easy-in-out select-none"
                            >
                                Click here to reset it.
                            </span>
                        </p>
                    </div>
                    <div className="box text-center">
                        <p>Don't have account?</p>
                        <p>
                            Click here to{' '}
                            <Link to={routesConfig.REGISTER.path} className="font-bold text-mainBlue">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            {isForgotPasswordModal && <ForgotPasswordModal setIsForgotPasswordModal={setIsForgotPasswordModal} />}
        </div>
    );
}

export default LoginPage;
