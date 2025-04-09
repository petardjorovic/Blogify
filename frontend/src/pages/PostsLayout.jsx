import React from 'react';
import { Outlet } from 'react-router-dom';

function PostsLayout() {
    return (
        <div className="container mx-auto">
            <div className="flex px-[16px] gap-[20px]">
                <div className="w-3/4">
                    <Outlet />
                </div>
                <div className="w-1/4 flex flex-col gap-[20px]">
                    <div className="box w-full">
                        <h3>Search Post</h3>
                    </div>
                    <div className="box w-full">
                        <h3>Create memory</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostsLayout;
