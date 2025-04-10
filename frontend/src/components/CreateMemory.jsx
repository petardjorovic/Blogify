import React, { useEffect } from 'react';
import Input from './Input';
import Label from './Label';

function CreateMemory() {
    useEffect(() => {
        console.log('CreateMemory');
    }, []);
    return (
        <div className="box w-full">
            <h3 className="font-semibold text-xl text-center mb-[12px]">Create memory</h3>
            <form>
                <Input type={'text'} placeholder={'Title'} className={'border w-full rounded-md px-[12px] py-[5px] mb-[10px]'} />
                <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="10"
                    placeholder="Message"
                    className="border w-full rounded-md px-[12px] py-[5px]"
                ></textarea>
                <Label>Tags</Label>
            </form>
        </div>
    );
}

export default CreateMemory;
