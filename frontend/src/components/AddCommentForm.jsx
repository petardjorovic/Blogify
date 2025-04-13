import { toast } from 'react-toastify';
import { addComment } from '../services/commentService';
import Button from './Button';
import Label from './Label';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { showLoader } from '../store/loaderSlice';

function AddCommentForm({ postId, rerenderView }) {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            body: '',
        },
        validationSchema: Yup.object({
            body: Yup.string()
                .required('comment is required')
                .min(4, 'comment must be at least 4 characters')
                .max(100, 'comment must be at most 100 characters'),
        }),
        onSubmit: async (values) => {
            dispatch(showLoader(true));
            const res = await addComment({ ...values, postId });
            dispatch(showLoader(false));
            if (res.status === 'success') {
                toast(res.message, {
                    type: 'success',
                    toastId: 1,
                });
                rerenderView();
                formik.resetForm();
            } else {
                toast(res.message, {
                    type: 'error',
                    toastId: 1,
                });
            }
        },
    });

    const showErrors = (inputName) => formik.errors[inputName] && formik.touched[inputName] && formik.errors[inputName];

    return (
        <form className="border-t border-b py-[20px]" onSubmit={formik.handleSubmit}>
            <Label htmlFor={'body'} className={'text-xl font-medium px-[14px]'}>
                Leave a comment {showErrors('body') && <span className="text-xs font-normal text-red-600">{showErrors('body')}</span>}
            </Label>
            <textarea
                name="body"
                id="body"
                cols="30"
                rows="2"
                placeholder="Message"
                className="border border-gray-400 w-full px-[14px] py-[6px] rounded-md mb-[10px] resize-none outline-none"
                value={formik.values.body}
                onChange={formik.handleChange}
            ></textarea>
            <Button
                className={
                    'w-full bg-mainBlue hover:bg-darkBlue text-white py-[6px] px-[14px] rounded-md transition duration-300 ease-in-out'
                }
                type={'submit'}
            >
                Post comment
            </Button>
        </form>
    );
}

export default AddCommentForm;
