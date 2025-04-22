import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Input from '../components/Input';
import Button from '../components/Button';

function SearchFormMember() {
    const [close, setClose] = useState(false);

    return (
        <form className="box w-full relative">
            <Input type={'text'} placeholder={'Search member'} className={'border w-full rounded-md px-[12px] py-[5px] outline-none'} />
            <Button
                type={'submit'}
                className={
                    'bg-mainBlue hover:bg-darkBlue w-full text-white rounded-md px-[12px] py-[5px] mt-[15px] uppercase transition duration-300 ease-in-out'
                }
            >
                Search
            </Button>
            {close && (
                <div className="absolute top-[20px] right-[20px] text-red-600 cursor-pointer">
                    <IoMdClose />
                </div>
            )}
        </form>
    );
}

export default SearchFormMember;
