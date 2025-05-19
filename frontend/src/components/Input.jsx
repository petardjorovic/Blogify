import React from 'react';

function Input({ type, placeholder, id, value, defaultValue, onChange, className, name, disabled, onBlur }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            id={id}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            className={className}
            name={name}
            disabled={disabled}
            onBlur={onBlur}
        />
    );
}

export default Input;
