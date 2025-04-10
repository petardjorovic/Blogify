import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import CreateMemory from '../components/CreateMemory';

function PostsLayout() {
    return (
        <div className="container mx-auto">
            <div className="flex px-[16px] gap-[20px]">
                <div className="w-2/3">
                    <Outlet />
                </div>
                <div className="w-1/3 flex flex-col gap-[20px]">
                    <SearchForm />
                    <CreateMemory />
                </div>
            </div>
        </div>
    );
}

export default PostsLayout;
