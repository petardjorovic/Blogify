function ErrorMessageInput({ touched, error }) {
    return <div className="text-xs min-h-[16px] text-red-600">{touched && error ? error : '\u00A0'}</div>;
}

export default ErrorMessageInput;
