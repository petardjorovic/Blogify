import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Label from '../components/Label';
import Input from '../components/Input';

function DashboardProfilePage() {
    const { user } = useSelector((state) => state.userStore);
    return (
        <div className="flex gap-3">
            <div>
                <img src={user.image} alt="avatar" className="w-[250px] h-[250px] rounded-full border-4 border-slate-300" />
            </div>
            <div className="flex flex-col gap-[5px]">
                <div className="flex items-center gap-[5px]">
                    <Label htmlFor={'firstName'}>First name: </Label>
                    <Input
                        type={'text'}
                        id={'firstName'}
                        value={user.firstName}
                        className={'px-[8px] py-[4px] rounded-md border outline-none'}
                    />
                </div>
                <div className="flex items-center gap-[5px]">
                    <Label htmlFor={'firstName'}>Last name: </Label>
                    <Input
                        type={'text'}
                        id={'firstName'}
                        value={user.lastName}
                        className={'px-[8px] py-[4px] rounded-md border outline-none'}
                    />
                </div>
            </div>
        </div>
    );
}

export default DashboardProfilePage;
