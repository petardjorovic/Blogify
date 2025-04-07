import React from 'react';

function Loader() {
    return (
        <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-9999">
            <div className="loader" style={{ animation: 'spin 2s linear infinite' }}></div>
        </div>
    );
}

export default Loader;
