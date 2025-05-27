import React, { useState } from 'react';
import registerImg from '../assets/register.jpg';
import RegisterForm from '../components/RegisterForm';
import ResendActivationLinkModal from '../components/ResendActivationLinkModal';
import useLockScroll from '../utils/useLockScroll';

function RegisterPage() {
    const [isModal, setIsModal] = useState(false);
    useLockScroll(isModal);

    return (
        <div className="container mx-auto">
            <div className="flex flex-col gap-[20px] lg:flex-row px-[16px] mb-4 items-stretch">
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
                    <div className="box">
                        <p className="text-center">
                            Activation link expired or didn't arrive?
                            <br />
                            <span
                                onClick={() => setIsModal(true)}
                                className="text-mainBlue font-bold cursor-pointer hover:text-violet-700 transition duration-300 easy-in-out select-none"
                            >
                                Resend it here
                            </span>{' '}
                            — a new one will be sent to your email and valid for the next 24 hours.
                        </p>
                    </div>
                </div>
                {isModal && <ResendActivationLinkModal setIsModal={setIsModal} />}
            </div>
        </div>
    );
}

export default RegisterPage;
