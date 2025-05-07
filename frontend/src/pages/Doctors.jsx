import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
    const { speciality } = useParams()
    const [FilterDoc, SetFilterdoc] = useState([])
    const [showFilter, setShowFilter] = useState(false)
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    const applyFilter = () => {
        if (speciality) {
            SetFilterdoc(doctors.filter(doc => doc.speciality === speciality))
        } else {
            SetFilterdoc(doctors)
        }
    }

    useEffect(() => {
        applyFilter()
    }, [doctors, speciality])

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-800">Browse Doctors</h1>
            <p className='text-gray-600 mt-2'>Browse through the doctors speciality.</p>

            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
                {/* Filter Button (Mobile) */}
                <button
                    className={`py-2 px-4 border rounded-full text-sm transition-all sm:hidden ${showFilter ? "bg-blue-500 text-white" : 'bg-white text-gray-700'
                        }`}
                    onClick={() => setShowFilter(prev => !prev)}
                >
                    {showFilter ? 'Hide Filters' : 'Show Filters'}
                </button>

                {/* Filters Sidebar */}
                <div className={`flex flex-col gap-3 text-sm text-gray-600 w-full sm:w-64 ${showFilter ? 'flex' : 'hidden sm:flex'
                    }`}>
                    <p
                        onClick={() => speciality === 'General physician' ? navigate('/doctors/') : navigate('/doctors/General physician')}
                        className={`py-2 px-4 border border-gray-200 rounded-full transition-all cursor-pointer hover:bg-indigo-50 ${speciality === "General physician" ? "bg-indigo-100 text-indigo-700 font-medium" : "bg-white"
                            }`}
                    >
                        General physician
                    </p>
                    <p
                        onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')}
                        className={`py-2 px-4 border border-gray-200 rounded-full transition-all cursor-pointer hover:bg-indigo-50 ${speciality === "Gynecologist" ? "bg-indigo-100 text-indigo-700 font-medium" : "bg-white"
                            }`}
                    >
                        Gynecologist
                    </p>
                    <p
                        onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')}
                        className={`py-2 px-4 border border-gray-200 rounded-full transition-all cursor-pointer hover:bg-indigo-50 ${speciality === "Dermatologist" ? "bg-indigo-100 text-indigo-700 font-medium" : "bg-white"
                            }`}
                    >
                        Dermatologist
                    </p>
                    <p
                        onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')}
                        className={`py-2 px-4 border border-gray-200 rounded-full transition-all cursor-pointer hover:bg-indigo-50 ${speciality === "Pediatricians" ? "bg-indigo-100 text-indigo-700 font-medium" : "bg-white"
                            }`}
                    >
                        Pediatricians
                    </p>
                    <p
                        onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')}
                        className={`py-2 px-4 border border-gray-200 rounded-full transition-all cursor-pointer hover:bg-indigo-50 ${speciality === "Neurologist" ? "bg-indigo-100 text-indigo-700 font-medium" : "bg-white"
                            }`}
                    >
                        Neurologist
                    </p>
                    <p
                        onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}
                        className={`py-2 px-4 border border-gray-200 rounded-full transition-all cursor-pointer hover:bg-indigo-50 ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-indigo-700 font-medium" : "bg-white"
                            }`}
                    >
                        Gastroenterologist
                    </p>
                </div>

                {/* Doctors Grid */}
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {FilterDoc.map((item, index) => {
                        const isAvailable = item.available === true

                        return (
                            <div
                                onClick={() => navigate(`/appointment/${item._id}`)}
                                className='border border-blue-100 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-1'
                                key={index}
                            >
                                <img
                                    className='bg-blue-50 w-full h-48 object-cover'
                                    src={item.image || '/default-doctor.png'}
                                    alt={item.name}
                                />
                                <div className='p-4'>
                                    <div className={`flex items-center gap-2 text-sm ${isAvailable ? 'text-green-500' : 'text-gray-500'
                                        }`}>
                                        <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
                                            }`}></span>
                                        <p>{isAvailable ? 'Available' : 'Not Available'}</p>
                                    </div>
                                    <p className='text-gray-900 text-lg font-medium mt-1'>{item.name}</p>
                                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                                    <p className='text-gray-500 text-xs mt-2'>
                                        {item.experience} years experience
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Doctors