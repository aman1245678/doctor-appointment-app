import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
    const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext);
    const { currency } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [localProfile, setLocalProfile] = useState({
        name: '',
        degree: '',
        speciality: '',
        experience: '',
        about: '',
        fees: 0,
        available: false,
        address: { line1: '', line2: '' },
        image: ''
    });

    useEffect(() => {
        if (profileData) {
            setLocalProfile({
                ...profileData,
                address: profileData.address || { line1: '', line2: '' }
            });
        }
    }, [profileData]);

    useEffect(() => {
        if (dToken) getProfileData();
    }, [dToken]);

    const updateProfile = async () => {
        try {
            setIsLoading(true);
            const updateData = {
                address: localProfile.address,
                fees: localProfile.fees,
                available: localProfile.available,
                about: localProfile.about,
            };

            const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`, updateData, {
                headers: { dToken },
            });

            if (data.success) {
                toast.success(data.message);
                setIsEdit(false);
                await getProfileData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Profile update failed:', error);
            toast.error(error.response?.data?.message || 'Update failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setLocalProfile((prev) => ({
            ...prev,
            address: { ...prev.address, [name]: value },
        }));
    };

    if (!profileData) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <div className="bg-blue-400 rounded-xl shadow-lg overflow-hidden border border-gray-200">
                {/* Header */}
                <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Professional Profile
                    </h2>
                </div>

                <div className="p-6 md:flex gap-8">
                    {/* Profile Image */}
                    <div className="md:w-1/3 mb-6 md:mb-0">
                        <div className="relative group">
                            <img
                                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md border-4 border-white"
                                src={localProfile.image || '/default-doctor.png'}
                                alt="Doctor Profile"
                            />
                            {isEdit && (
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="px-4 py-2 bg-white text-blue-600 rounded-full shadow-md font-medium">
                                        Change Photo
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="md:w-2/3">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-1">{localProfile.name}</h3>
                            <div className="flex items-center flex-wrap gap-2">
                                <span className="text-gray-600">{localProfile.degree}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-600">{localProfile.speciality}</span>
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full ml-2">
                                    {localProfile.experience} years experience
                                </span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">About</h4>
                            {isEdit ? (
                                <textarea
                                    name="about"
                                    value={localProfile.about}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="4"
                                />
                            ) : (
                                <p className="text-gray-700">{localProfile.about}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Fees */}
                            <div>
                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Appointment Fee</h4>
                                {isEdit ? (
                                    <div className="flex items-center">
                                        <span className="mr-2 text-gray-700">{currency}</span>
                                        <input
                                            type="number"
                                            name="fees"
                                            value={localProfile.fees}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                ) : (
                                    <p className="text-gray-700">{currency}{localProfile.fees}</p>
                                )}
                            </div>

                            {/* Availability */}
                            <div>
                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Availability</h4>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={localProfile.available}
                                        onChange={() => setLocalProfile((prev) => ({ ...prev, available: !prev.available }))}
                                        disabled={!isEdit}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <span className="ml-2 text-gray-700">
                                        {localProfile.available ? 'Currently available' : 'Not currently available'}
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Address</h4>
                            {isEdit ? (
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        name="line1"
                                        value={localProfile.address.line1}
                                        onChange={handleAddressChange}
                                        placeholder="Address line 1"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        type="text"
                                        name="line2"
                                        value={localProfile.address.line2}
                                        onChange={handleAddressChange}
                                        placeholder="Address line 2"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            ) : (
                                <div className="text-gray-700">
                                    <p>{localProfile.address.line1}</p>
                                    {localProfile.address.line2 && <p>{localProfile.address.line2}</p>}
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                            {isEdit ? (
                                <>
                                    <button
                                        onClick={() => {
                                            setIsEdit(false);
                                            setLocalProfile(profileData);
                                        }}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={updateProfile}
                                        disabled={isLoading}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                                    >
                                        {isLoading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEdit(true)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;
