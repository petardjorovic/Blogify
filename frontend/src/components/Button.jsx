import React from 'react';

function Button({ children, className, type, onClick, onSubmit }) {
    return (
        <button className={className} type={type} onClick={onClick} onSubmit={onSubmit}>
            {children}
        </button>
    );
}

export default Button;
