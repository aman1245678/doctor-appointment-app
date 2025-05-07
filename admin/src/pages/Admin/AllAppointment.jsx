import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const AllAppointment = () => {
    const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
    const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        if (aToken) {
            getAllAppointments();
        }
    }, [aToken]);

    const filteredAppointments = appointments.filter(appointment => {
        const matchesSearch = appointment.userData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.docData.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' ||
            (filterStatus === 'cancelled' && appointment.cancelled) ||
            (filterStatus === 'active' && !appointment.cancelled);

        return matchesSearch && matchesStatus;
    });

    return (
        <div className='w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6'>
            {/* Header Section */}
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div>
                    <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>Appointment Management</h2>
                    <p className='text-gray-500 mt-1'>View and manage all patient appointments</p>
                </div>

                <div className='flex flex-col sm:flex-row gap-3'>
                    <div className='relative flex-1 min-w-[200px]'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                            </svg>
                        </div>
                        <input
                            type='text'
                            placeholder='Search patients or doctors...'
                            className='pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <select
                        className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value='all'>All Appointments</option>
                        <option value='active'>Active Only</option>
                        <option value='cancelled'>Cancelled Only</option>
                    </select>
                </div>
            </div>

            {/* Stats Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                <div className='bg-white p-4 rounded-xl shadow border border-gray-100'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-sm font-medium text-gray-500'>Total Appointments</p>
                            <p className='text-2xl font-bold text-gray-800 mt-1'>{appointments.length}</p>
                        </div>
                        <div className='p-3 rounded-full bg-blue-50 text-blue-600'>
                            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className='bg-white p-4 rounded-xl shadow border border-gray-100'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-sm font-medium text-gray-500'>Active Appointments</p>
                            <p className='text-2xl font-bold text-gray-800 mt-1'>
                                {appointments.filter(a => !a.cancelled).length}
                            </p>
                        </div>
                        <div className='p-3 rounded-full bg-green-50 text-green-600'>
                            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className='bg-white p-4 rounded-xl shadow border border-gray-100'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-sm font-medium text-gray-500'>Cancelled Appointments</p>
                            <p className='text-2xl font-bold text-gray-800 mt-1'>
                                {appointments.filter(a => a.cancelled).length}
                            </p>
                        </div>
                        <div className='p-3 rounded-full bg-red-50 text-red-600'>
                            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Appointments Table */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
                {/* Table Header */}
                <div className='hidden sm:grid grid-cols-12 gap-4 bg-gray-50 py-4 px-6 border-b border-gray-200'>
                    <div className='col-span-1 font-medium text-gray-600 text-sm uppercase tracking-wider'>#</div>
                    <div className='col-span-3 font-medium text-gray-600 text-sm uppercase tracking-wider'>Patient</div>
                    <div className='col-span-1 font-medium text-gray-600 text-sm uppercase tracking-wider'>Age</div>
                    <div className='col-span-2 font-medium text-gray-600 text-sm uppercase tracking-wider'>Date</div>
                    <div className='col-span-1 font-medium text-gray-600 text-sm uppercase tracking-wider'>Time</div>
                    <div className='col-span-2 font-medium text-gray-600 text-sm uppercase tracking-wider'>Doctor</div>
                    <div className='col-span-1 font-medium text-gray-600 text-sm uppercase tracking-wider'>Fees</div>
                    <div className='col-span-1 font-medium text-gray-600 text-sm uppercase tracking-wider'>Status</div>
                </div>

                {/* Appointments List */}
                <div className='max-h-[calc(100vh-400px)] overflow-y-auto'>
                    {filteredAppointments.length === 0 ? (
                        <div className='p-8 text-center'>
                            <div className='inline-block p-4 bg-gray-50 rounded-full'>
                                <svg className='w-12 h-12 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                                </svg>
                            </div>
                            <h3 className='mt-4 text-lg font-medium text-gray-700'>No appointments found</h3>
                            <p className='mt-1 text-gray-500'>Try adjusting your search or filter criteria</p>
                        </div>
                    ) : (
                        filteredAppointments.map((item, index) => (
                            <div
                                key={index}
                                className={`grid grid-cols-2 sm:grid-cols-12 gap-3 items-center py-4 px-4 sm:px-6 border-b border-gray-100 transition-all duration-150 ${item.cancelled ? 'bg-red-50/50' : 'hover:bg-gray-50'
                                    }`}
                            >
                                {/* Index */}
                                <div className='hidden sm:block col-span-1 text-gray-500 font-medium'>
                                    {index + 1}
                                </div>

                                {/* Patient */}
                                <div className='col-span-1 sm:col-span-3 flex items-center gap-3'>
                                    <div className='relative'>
                                        <img
                                            className='w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm'
                                            src={item.userData.image || assets.default_user}
                                            alt={item.userData.name}
                                            onError={(e) => {
                                                e.target.src = assets.default_user;
                                            }}
                                        />
                                        {!item.cancelled && (
                                            <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></span>
                                        )}
                                    </div>
                                    <div>
                                        <p className='font-medium text-gray-800'>{item.userData.name}</p>
                                        <p className='sm:hidden text-xs text-gray-500 mt-1'>
                                            Age: {calculateAge(item.userData.dob)}
                                        </p>
                                    </div>
                                </div>

                                {/* Age */}
                                <div className='hidden sm:block col-span-1 text-gray-500'>
                                    {calculateAge(item.userData.dob)}
                                </div>

                                {/* Date */}
                                <div className='col-span-1 sm:col-span-2'>
                                    <p className='text-sm font-medium text-gray-800'>
                                        {slotDateFormat(item.slotDate)}
                                    </p>
                                </div>

                                {/* Time */}
                                <div className='col-span-1'>
                                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                                        {item.slotTime}
                                    </span>
                                </div>

                                {/* Doctor */}
                                <div className='col-span-1 sm:col-span-2 flex items-center gap-3'>
                                    <img
                                        className='w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm'
                                        src={item.docData.image || assets.default_doctor}
                                        alt={item.docData.name}
                                        onError={(e) => {
                                            e.target.src = assets.default_doctor;
                                        }}
                                    />
                                    <p className='text-gray-800'>{item.docData.name}</p>
                                </div>

                                {/* Fees */}
                                <div className='col-span-1 font-medium text-gray-800'>
                                    {currency}{item.amount}
                                </div>

                                {/* Status */}
                                <div className='col-span-1 flex justify-end sm:justify-start'>
                                    {item.cancelled ? (
                                        <span className='px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800'>
                                            Cancelled
                                        </span>
                                    ) : (
                                        <div className='flex items-center gap-2'>
                                            <span className='px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                                                Confirmed
                                            </span>
                                            <button
                                                onClick={() => cancelAppointment(item._id)}
                                                className='p-1.5 text-gray-400 hover:text-red-500 transition-colors duration-200'
                                                title='Cancel Appointment'
                                            >
                                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
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

export default AllAppointment;