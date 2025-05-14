import React, { useContext, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
    const { aToken, getDashData, cancelAppointment, dashData, appointments } = useContext(AdminContext);
    const { slotDateFormat } = useContext(AppContext);

    useEffect(() => {
        if (aToken) {
            getDashData();
        }
    }, [aToken]);

    const handleCancelAppointment = (id) => {
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            cancelAppointment(id);
        }
    };

    if (!dashData || !appointments) {
        return (
            <div className="w-full max-w-7xl mx-auto p-6">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
                </div>
            </div>
        );
    }

    // Corrected counting logic
    const totalAppointments = appointments.length;
    const activeAppointments = appointments.filter(a => !a.cancelled).length;
    const cancelledAppointments = appointments.filter(a => a.cancelled).length;
    const uniquePatients = new Set(appointments.map(app => app.userData?._id)).size;

    return (
        <div className='w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6'>
            <div>
                <h2 className='text-3xl font-bold text-gray-800'>Dashboard Overview</h2>
                <p className='text-gray-500 mt-1'>Quick summary of your clinic's activity</p>
            </div>

            {/* Stats Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {/* Total Doctors */}
                <StatCard title="Total Doctors" count={dashData.doctors} icon={assets.doctor_icon} bgColor="bg-blue-50" />

                {/* Total Patients */}
                <StatCard title="Total Patients" count={uniquePatients} icon={assets.patients_icon} bgColor="bg-green-50" />

                {/* Total Appointments */}
                <StatCard title="Appointments" count={totalAppointments} icon={assets.appointment_icon} bgColor="bg-purple-50" />

                {/* Active Appointments */}
                <StatCard title="Active Appointments" count={activeAppointments} icon={assets.check_icon} bgColor="bg-green-100" />
            </div>

            {/* Cancelled Appointments */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition-all'>
                    <h3 className='text-lg font-semibold mb-4 text-gray-700'>Cancelled Appointments</h3>
                    <p className='text-3xl font-bold text-red-600'>{cancelledAppointments}</p>
                </div>
            </div>

            {/* All Appointments */}
            <div className='bg-white rounded-2xl shadow-md border'>
                <div className='flex items-center justify-between p-6 border-b'>
                    <div className='flex gap-2 items-center'>
                        <img src={assets.list_icon} alt="list" className="w-6 h-6" />
                        <p className='font-semibold text-gray-800'>All Appointments</p>
                    </div>
                    <span className='text-sm text-gray-500'>{appointments.length} appointments</span>
                </div>

                <div>
                    {appointments.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500">No appointments found</p>
                        </div>
                    ) : (
                        appointments.map((item, index) => (
                            <div key={index} className={`grid grid-cols-12 items-center gap-4 p-6 hover:bg-gray-50 ${item.cancelled ? 'bg-red-50' : ''}`}>
                                <div className="col-span-1 hidden sm:block text-gray-400">{index + 1}</div>

                                <div className="col-span-5 sm:col-span-3 flex items-center gap-3">
                                    <img src={item.docData.image || assets.default_doctor} className="w-10 h-10 rounded-full" alt="Doctor" />
                                    <div>
                                        <p className="font-medium text-gray-800">{item.docData.name}</p>
                                        <p className="text-sm text-gray-500">{slotDateFormat(item.slotDate)}</p>
                                    </div>
                                </div>

                                <div className="col-span-2 hidden md:block">
                                    <p className="text-gray-700 text-sm">{item.slotTime}</p>
                                </div>

                                <div className="col-span-4 sm:col-span-3 flex items-center gap-3">
                                    <img src={item.userData.image || assets.default_user} className="w-8 h-8 rounded-full hidden sm:block" alt="User" />
                                    <p className="text-gray-700 truncate">{item.userData.name}</p>
                                </div>

                                <div className="col-span-2 flex justify-end">
                                    {item.cancelled ? (
                                        <span className='px-3 py-1 rounded-full text-xs bg-red-100 text-red-800'>Cancelled</span>
                                    ) : (
                                        <div className="flex gap-2 items-center">
                                            <span className='px-3 py-1 rounded-full text-xs bg-green-100 text-green-800'>Confirmed</span>
                                            <button onClick={() => handleCancelAppointment(item._id)} className='text-gray-400 hover:text-red-500'>
                                                <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, count, icon, bgColor }) => (
    <div className={`bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition-all`}>
        <div className="flex justify-between items-center">
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-2">{count}</h3>
            </div>
            <div className={`p-3 rounded-full ${bgColor}`}>
                <img src={icon} alt={title} className="w-6 h-6" />
            </div>
        </div>
    </div>
);

export default Dashboard;
