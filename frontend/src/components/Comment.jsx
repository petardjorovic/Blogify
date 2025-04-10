import React from 'react';
import Input from './Input';
import Button from './Button';

function Comment() {
    return (
        <div className="border-t border-b py-[20px]">
            <h3 className="text-2xl font-medium mb-[10px]">Comments:</h3>
            <form>
                {/* <Input
                    className={'border border-gray-400 w-full px-[14px] pt-[6px] pb-[35px] rounded-md mb-[10px]'}
                    type={'text'}
                    placeholder={'Add your comment'}
                /> */}
                <textarea
                    cols="30"
                    rows="2"
                    placeholder="Add your comment"
                    className="border border-gray-400 w-full px-[14px] py-[6px] rounded-md mb-[10px] resize-none outline-none"
                ></textarea>
                <Button
                    className={
                        'w-full bg-mainBlue hover:bg-darkBlue text-white py-[6px] px-[14px] rounded-md transition duration-300 ease-in-out'
                    }
                    type={'submit'}
                >
                    Add comment
                </Button>
            </form>
        </div>
    );
}

export default Comment;
