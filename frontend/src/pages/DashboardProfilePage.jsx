import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Label from '../components/Label';
import Input from '../components/Input';
import { showLoader } from '../store/loaderSlice';
import { getDashboardUserProfile, updateProfileImage, updateUserInfo } from '../services/dashboardService';
import { imageValidation } from '../utils/imageValidation';
import { toast } from 'react-toastify';
import ChangePasswordModal from '../components/ChangePasswordModal';
import ChangeEmailModal from '../components/ChangeEmailModal';
import { formatDate } from '../utils/formatDate';

function DashboardProfilePage() {
    const [user, setUser] = useState({});
    const [inputsData, setInputsData] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        gender: '',
    });
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const dispatch = useDispatch();
    const [imageLabel, setImageLabel] = useState('image');
    const [isFirstName, setIsFirstName] = useState(true);
    const [isLastName, setIsLastName] = useState(true);
    const [isChangePasswordModal, setIsChangePasswordModal] = useState(false);
    const [isChangeEmailModal, setIsChangeEmailModal] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            dispatch(showLoader(true));
            const res = await getDashboardUserProfile();
            dispatch(showLoader(false));
            if (res.status === 'success') {
                setUser(res.user);
            }
        };
        fetchUser();
    }, [dispatch]);

    useEffect(() => {
        if (user && Object.keys(user).length > 0) {
            setInputsData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                birthDate: user.birthDate?.split('T')[0] || '',
                gender: user.gender || '',
            });
            setImage(user.image || '');
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputsData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!imageValidation(file).status) {
            toast.error(imageValidation(file).msg);
            return;
        }

        // Prikaz preview slike odmah
        const localImageUrl = URL.createObjectURL(file);
        setPreviewImage(localImageUrl);

        const formData = new FormData();
        formData.append('image', file);

        setImageLabel('');
        const res = await updateProfileImage(formData);
        if (res.status === 'success') {
            setImageLabel('image');
            setImage(res.image);
            toast.success(res.message);
        } else {
            setImageLabel('image');
            setPreviewImage(user.image); // Vrati staru sliku
            toast.error(res.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        !inputsData.firstName ? setIsFirstName(false) : setIsFirstName(true);
        !inputsData.lastName ? setIsLastName(false) : setIsLastName(true);
        if (!inputsData.firstName || !inputsData.lastName) return;
        if (
            inputsData.firstName.trim() === user.firstName &&
            inputsData.lastName.trim() === user.lastName &&
            ((!inputsData.birthDate && !user.birthDate) || formatDate(inputsData.birthDate) === formatDate(user.birthDate)) &&
            ((!inputsData.gender && !user.gender) || inputsData.gender === user.gender)
        ) {
            return;
        }

        dispatch(showLoader(true));
        const res = await updateUserInfo(inputsData);
        dispatch(showLoader(false));
        console.log(res, 'res sa fronta update user info');
        if (res.status === 'success') {
            setUser(res.user);
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
                {/* Avatar and buttons */}
                <div className="flex flex-col items-center gap-4">
                    <img
                        src={previewImage || image}
                        alt="avatar"
                        className="w-[200px] h-[200px] rounded-full border-4 border-slate-300 object-cover"
                    />
                    <label
                        htmlFor={imageLabel}
                        className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
                            !imageLabel && 'opacity-60 cursor-not-allowed'
                        }`}
                    >
                        <input type="file" name="image" id="image" accept="image/*" className="hidden" onChange={handleImageChange} />
                        Change Image
                    </label>
                    <button className="px-4 py-2 text-sm text-blue-600 underline" onClick={() => setIsChangeEmailModal(true)}>
                        Change Email
                    </button>
                    <button className="px-4 py-2 text-sm text-blue-600 underline" onClick={() => setIsChangePasswordModal(true)}>
                        Change Password
                    </button>
                    <button className="px-4 py-2 text-sm text-red-600 underline">Delete Profile</button>
                </div>
                {/* Form */}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="">
                        <Label>Email</Label>
                        <p className="w-full mt-1 px-3 py-2 border rounded-md">{user.email}</p>
                    </div>
                    <div className="">
                        <Label>Member from</Label>
                        <p className="w-full mt-1 px-3 py-2 border rounded-md">{user?.createdAt?.split('T')[0]}</p>
                    </div>
                    <div className="">
                        <Label htmlFor={'firstName'} className={`${!isFirstName && 'text-red-600'}`}>
                            {isFirstName ? 'First name' : 'First name is required'}
                        </Label>
                        <Input
                            className={'w-full mt-1 px-3 py-2 border rounded-md'}
                            type={'text'}
                            name={'firstName'}
                            id={'firstName'}
                            value={inputsData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="">
                        <Label htmlFor={'lastName'} className={`${!isFirstName && 'text-red-600'}`}>
                            {isLastName ? 'Last name' : 'Last name is required'}
                        </Label>
                        <Input
                            // className={'px-[8px] py-[4px] rounded-md border outline-none'}
                            className="w-full mt-1 px-3 py-2 border rounded-md"
                            type={'text'}
                            id={'lasttName'}
                            name={'lastName'}
                            value={inputsData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="birthDate">Birth date</Label>
                        <Input
                            type={'date'}
                            name={'birthDate'}
                            id={'birthDate'}
                            value={inputsData.birthDate}
                            onChange={handleChange}
                            className="w-full mt-1 px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label>Gender</label>
                        <div className="flex gap-4 mt-2">
                            <label htmlFor="" className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    value={'male'}
                                    checked={inputsData.gender === 'male'}
                                    onChange={handleChange}
                                />
                                Male
                            </label>
                            <label htmlFor="" className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    value={'female'}
                                    checked={inputsData.gender === 'female'}
                                    onChange={handleChange}
                                />
                                Female
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="px-4 py-2 rounded-md bg-green-600 text-white outline-none hover:bg-green-700">
                        Save changes
                    </button>
                </form>
            </div>
            {isChangePasswordModal && <ChangePasswordModal setIsChangePasswordModal={setIsChangePasswordModal} />}
            {isChangeEmailModal && <ChangeEmailModal setIsChangeEmailModal={setIsChangeEmailModal} />}
        </div>
    );
}

export default DashboardProfilePage;
