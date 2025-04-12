import { useEffect, useState } from 'react';
import Input from './Input';
import Button from './Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { routesConfig } from '../config/routesConfig';

function SearchPost() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [close, setClose] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value) {
            setClose(true);
        } else if (!e.target.value) {
            setClose(false);
        }
    };

    const handleClose = () => {
        setSearchTerm('');
        setClose(!close);
        navigate(routesConfig.POST.path);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (/^\s*$/.test(searchTerm)) {
            setClose(false);
            setSearchTerm('');
            searchParams.delete('keyword');
            setSearchParams(searchParams);
            return;
        }
        searchParams.delete('keyword');
        searchTerm.split(';').forEach((term) => {
            searchParams.append('keyword', term.trim());
        });

        navigate(routesConfig.SEARCH_POST.path + '?' + searchParams);
    };

    return (
        <form className="box w-full relative" onSubmit={handleSubmit}>
            <Input
                type={'text'}
                placeholder={'Search post'}
                className={'border w-full rounded-md px-[12px] py-[5px] outline-none'}
                value={searchTerm}
                onChange={handleChange}
            />
            <Button
                type={'submit'}
                className={
                    'bg-mainBlue hover:bg-darkBlue w-full text-white rounded-md px-[12px] py-[5px] mt-[15px] uppercase transition duration-300 ease-in-out'
                }
            >
                Search
            </Button>
            {close && (
                <div className="absolute top-[20px] right-[20px] text-red-600 cursor-pointer" onClick={handleClose}>
                    <IoMdClose />
                </div>
            )}
        </form>
    );
}

export default SearchPost;
