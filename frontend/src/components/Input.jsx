import React from 'react';

function Input({ type, placeholder, id, value, defaultValue, onChange, className }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            id={id}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            className={className}
        />
    );
}

export default Input;
