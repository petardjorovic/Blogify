import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { routesConfig } from '../config/routesConfig';

function Navbar() {
    return (
        <header className="container mx-auto px-[16px]">
            <div className="box flex items-center justify-between mt-[15px] mb-[40px]">
                <div className="flex items-center gap-[5px]">
                    <img src={logo} alt="logo" className="w-[50px]" />
                    <p className="text-base">SocialNet</p>
                </div>
                <nav className="flex gap-[10px]">
                    <Link to={routesConfig.REGISTER.path} className="border border-mainBlue p-[8px] rounded-[10px] uppercase">
                        Register
                    </Link>
                    <Link to={routesConfig.LOGIN.path} className="border border-mainBlue p-[8px] rounded-[10px] uppercase">
                        Login
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
