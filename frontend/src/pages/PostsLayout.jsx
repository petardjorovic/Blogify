import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import CreateMemory from '../components/CreateMemory';

function PostsLayout() {
    const [refreshPosts, setRefreshPosts] = useState(false);
    return (
        <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row px-[16px] gap-[20px] mb-[30px]">
                <div className="w-full lg:w-2/3">
                    <Outlet context={{ refreshPosts }} />
                </div>
                <div className="w-full lg:w-1/3 flex flex-col gap-[20px]">
                    <SearchForm />
                    <CreateMemory onPostCreated={() => setRefreshPosts((prev) => !prev)} />
                </div>
            </div>
        </div>
    );
}

export default PostsLayout;
