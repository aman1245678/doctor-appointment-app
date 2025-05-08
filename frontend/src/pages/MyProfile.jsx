import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const MyProfile = () => {
    const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const updateUserProfileData = async () => {
        try {
            setIsLoading(true);
            if (!token) {
                toast.error("Unauthorized access");
                return;
            }

            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('address', JSON.stringify(userData.address));
            formData.append('gender', userData.gender);
            formData.append('dob', userData.dob);

            if (image) {
                formData.append('image', image);
            }

            const { data } = await axios.post(
                `${backendUrl}/api/user/update-profile`, 
                formData, 
                { 
                    headers: { 
                        token,
                        'Content-Type': 'multipart/form-data'
                    } 
                }
            );

            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
                setIsEdit(false);
                setImage(null);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Profile update error:', error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    return userData ? (
        <div className='max-w-lg mx-auto p-6 flex flex-col gap-4 text-sm bg-white rounded-lg shadow-md'>
            {/* Profile Image Section */}
            <div className='flex flex-col items-center'>
                {isEdit ? (
                    <label htmlFor="image" className='cursor-pointer'>
                        <div className='relative'>
                            <img 
                                className='w-36 h-36 object-cover rounded-full border-2 border-gray-200 opacity-90 hover:opacity-100' 
                                src={image ? URL.createObjectURL(image) : userData.image || assets.default_profile} 
                                alt='Profile' 
                            />
                            {!image && (
                                <img 
                                    className='w-8 absolute bottom-3 right-3 bg-white p-1 rounded-full' 
                                    src={assets.upload_icon} 
                                    alt='Upload' 
                                />
                            )}
                        </div>
                        <input 
                            onChange={(e) => setImage(e.target.files[0])} 
                            type='file' 
                            id='image' 
                            accept='image/*'
                            hidden 
                        />
                    </label>
                ) : (
                    <img 
                        className='w-36 h-36 object-cover rounded-full border-2 border-gray-200' 
                        src={userData.image || assets.default_profile} 
                        alt='Profile' 
                    />
                )}
            </div>

            {/* Name Field */}
            <div className='text-center'>
                {isEdit ? (
                    <input 
                        className='bg-gray-100 text-3xl font-medium text-center py-1 px-2 rounded focus:outline-blue-500' 
                        type='text' 
                        value={userData.name || ''}
                        onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                    />
                ) : (
                    <p className='font-medium text-3xl text-neutral-800'>{userData.name}</p>
                )}
            </div>

            <hr className='border-t border-gray-300 my-2' />

            {/* Contact Information */}
            <div className='space-y-4'>
                <p className='text-neutral-500 font-medium'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_2fr] gap-y-3 text-neutral-700'>
                    <p className='font-medium'>Email:</p>
                    <p className='text-blue-600'>{userData.email}</p>

                    <p className='font-medium'>Phone:</p>
                    {isEdit ? (
                        <input 
                            className='bg-gray-100 px-2 py-1 rounded focus:outline-blue-500' 
                            type='tel' 
                            value={userData.phone || ''}
                            onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                        />
                    ) : (
                        <p className='text-blue-500'>{userData.phone || 'Not provided'}</p>
                    )}

                    <p className='font-medium'>Address:</p>
                    {isEdit ? (
                        <div className='space-y-2'>
                            <input 
                                className='bg-gray-100 w-full px-2 py-1 rounded focus:outline-blue-500' 
                                placeholder='Address line 1'
                                value={userData.address?.line1 || ''}
                                onChange={(e) => setUserData(prev => ({
                                    ...prev,
                                    address: { ...prev.address, line1: e.target.value }
                                }))} 
                            />
                            <input 
                                className='bg-gray-100 w-full px-2 py-1 rounded focus:outline-blue-500' 
                                placeholder='Address line 2'
                                value={userData.address?.line2 || ''}
                                onChange={(e) => setUserData(prev => ({
                                    ...prev,
                                    address: { ...prev.address, line2: e.target.value }
                                }))} 
                            />
                        </div>
                    ) : (
                        <p className='text-gray-600'>
                            {userData.address?.line1 || 'Not provided'} <br />
                            {userData.address?.line2}
                        </p>
                    )}
                </div>
            </div>

            {/* Basic Information */}
            <div className='space-y-4'>
                <p className='text-neutral-500 font-medium'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_2fr] gap-y-3 text-neutral-700'>
                    <p className='font-medium'>Gender:</p>
                    {isEdit ? (
                        <select 
                            className='bg-gray-100 px-2 py-1 rounded focus:outline-blue-500 max-w-[180px]' 
                            onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                            value={userData.gender || ''}
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                    ) : (
                        <p className='text-gray-600 capitalize'>{userData.gender || 'Not specified'}</p>
                    )}

                    <p className='font-medium'>Birthday:</p>
                    {isEdit ? (
                        <input 
                            className='bg-gray-100 px-2 py-1 rounded focus:outline-blue-500 max-w-[180px]' 
                            type="date" 
                            value={userData.dob || ''}
                            onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                        />
                    ) : (
                        <p className='text-gray-600'>{userData.dob || 'Not specified'}</p>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className='flex justify-center mt-8 gap-4'>
                {isEdit ? (
                    <>
                        <button 
                            className='border border-gray-500 px-6 py-2 rounded-full hover:bg-gray-100 transition-all'
                            onClick={() => {
                                setIsEdit(false);
                                setImage(null);
                            }}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button 
                            className='bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all disabled:opacity-50'
                            onClick={updateUserProfileData}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </>
                ) : (
                    <button 
                        className='bg-blue-600 text-white px-8 py-2 rounded-full hover:bg-blue-700 transition-all'
                        onClick={() => setIsEdit(true)}
                    >
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    ) : (
        <div className='flex justify-center items-center h-64'>
            <p>Loading profile data...</p>
        </div>
    );
};

export default MyProfile;
