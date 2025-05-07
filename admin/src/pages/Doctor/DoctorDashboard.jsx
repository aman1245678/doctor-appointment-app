import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const DoctorDashboard = () => {
    const {
        dToken,
        dashData,
        getDashData,
        completeAppointment,
        cancelAppointment
    } = useContext(DoctorContext);

    const { currency, slotDateFormat } = useContext(AppContext);

    useEffect(() => {
        if (dToken) {
            getDashData();
        }
    }, [dToken]);

    if (!dashData) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-6 bg-blue-400 rounded-xl shadow-lg overflow-hidden border border-gray-200">
            {/* Dashboard Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                    Doctor Dashboard
                </h1>
                <p className="text-gray-600 mt-1"></p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Earnings Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-blue-50 mr-4">
                            <img className="w-8 h-8" src={assets.earning_icon_icon} alt="Earnings" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Earnings</p>
                            <p className="text-2xl font-bold text-gray-800 mt-1">{currency}{dashData.earnings}</p>
                        </div>
                    </div>
                </div>

                {/* Appointments Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-green-50 mr-4">
                            <img className="w-8 h-8" src={assets.appointment_icon} alt="Appointments" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Appointments</p>
                            <p className="text-2xl font-bold text-gray-800 mt-1">{dashData.appointments}</p>
                        </div>
                    </div>
                </div>

                {/* Patients Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-purple-50 mr-4">
                            <img className="w-8 h-8" src={assets.patients_icon} alt="Patients" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Patients</p>
                            <p className="text-2xl font-bold text-gray-800 mt-1">{dashData.patients}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Latest Appointments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <h2 className="text-lg font-semibold text-gray-800">Recent Appointments</h2>
                    </div>
                </div>

                <div className="divide-y divide-gray-200">
                    {dashData.latestAppointments.length > 0 ? (
                        dashData.latestAppointments.map((item, index) => (
                            <div className="px-6 py-4 hover:bg-gray-50 transition-colors" key={index}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" src={item.userData.image} alt={item.userData.name} />
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-900">{item.userData.name}</p>
                                            <p className="text-xs text-gray-500">{slotDateFormat(item.slotDate)} at {item.slotTime}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        {item.cancelled ? (
                                            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                                                Cancelled
                                            </span>
                                        ) : item.isCompleted ? (
                                            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                                Completed
                                            </span>
                                        ) : (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => completeAppointment(item._id)}
                                                    className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                                                    title="Mark as completed"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => cancelAppointment(item._id)}
                                                    className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                                    title="Cancel appointment"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="px-6 py-12 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <h3 className="mt-2 text-lg font-medium text-gray-900">No recent appointments</h3>
                            <p className="mt-1 text-sm text-gray-500">You don't have any appointments yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
