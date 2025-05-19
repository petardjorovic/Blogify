import React from 'react';

function InputField({ formik, inputName, type, labelName }) {
    return (
        <div className="relative w-full mt-1">
            <input
                type={type}
                id={inputName}
                name={inputName}
                placeholder=" "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[inputName]}
                className={`peer block w-full appearance-none border rounded-md bg-white px-3 pt-5 pb-2 text-sm focus:outline-none
      ${
          formik.touched[inputName] && formik.errors[inputName]
              ? 'border-red-600 focus:border-red-600 focus:ring-red-600'
              : 'border-gray-300 focus:border-blue-600 focus:ring-blue-600'
      }
    `}
            />
            <label
                htmlFor={inputName}
                className="absolute left-3 -top-[10px] bg-white px-1 text-xs text-gray-500 transition-all 
      peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
      peer-focus:-top-[10px] peer-focus:text-xs peer-focus:text-blue-600"
            >
                {labelName}
            </label>

            {/* Error message */}
            <p className="min-h-[1rem] text-xs text-red-600 text-start px-3 mt-[2px]">
                {formik.touched[inputName] && formik.errors[inputName] ? formik.errors[inputName] : '\u00A0'}
            </p>
        </div>
    );
}

export default InputField;
