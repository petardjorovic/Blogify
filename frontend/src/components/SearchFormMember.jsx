import Input from '../components/Input';
import Button from '../components/Button';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function SearchFormMember() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimed = searchTerm.trim();
        if (!trimed) {
            searchParams.delete('member');
            setSearchParams(searchParams);
            return;
        } else {
            searchParams.set('member', trimed);
            setSearchParams(searchParams);
            console.log(trimed);
        }
    };
    return (
        <form className="box w-full relative" onSubmit={handleSubmit}>
            <Input
                type={'text'}
                placeholder={'Search member'}
                className={'border w-full rounded-md px-[12px] py-[5px] outline-none'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
                type={'submit'}
                className={
                    'bg-mainBlue hover:bg-darkBlue w-full text-white rounded-md px-[12px] py-[5px] mt-[15px] uppercase transition duration-300 ease-in-out'
                }
            >
                Search
            </Button>
        </form>
    );
}

export default SearchFormMember;
