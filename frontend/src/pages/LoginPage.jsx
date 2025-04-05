import React from 'react';
import LoginForm from '../components/LoginForm';
import loginImg from '../assets/login-Img.jpg';
import logImg from '../assets/log.jpg';

function LoginPage() {
    return (
        <div className="mx-auto">
            <div className="bg-cover bg-center h-screen flex items-center justify-center" style={{ backgroundImage: `url(${logImg})` }}>
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;
