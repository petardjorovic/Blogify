import React, { useEffect } from 'react';
import Input from './Input';
import Button from './Button';

function SearchPost() {
    useEffect(() => {
        console.log('SearchPost');
    }, []);
    return (
        <form className="box w-full">
            <Input type={'text'} placeholder={'Search post'} className={'border w-full rounded-md px-[12px] py-[5px] outline-none'} />
            <Button
                className={
                    'bg-mainBlue hover:bg-darkBlue w-full text-white rounded-md px-[12px] py-[5px] mt-[15px] uppercase transition duration-300 ease-in-out'
                }
            >
                Search
            </Button>
        </form>
    );
}

export default SearchPost;
