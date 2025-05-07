import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router'

const MyAppointments = () => {
    const { backendUrl, token } = useContext(AppContext)
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(false)
    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`
    }

    const navigate = useNavigate()

    const getUserAppointments = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/user/cancel-appointment`,
                { appointmentId },
                { headers: { token } }
            )

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || error.message)
        }
    }

    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/user/payment-razorpay`,
                { appointmentId },
                { headers: { token } }
            )

            if (data.success) {
                const options = {
                    key: data.key,
                    amount: data.order.amount,
                    currency: data.order.currency,
                    name: "Doctor Appointment",
                    description: "Appointment Payment",
                    order_id: data.order.id,
                    handler: async function (response) {
                        try {
                            // Call verify API after payment success
                            const verifyRes = await axios.post(`${backendUrl}/api/user/verify-payment`, {
                                appointmentId,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }, {
                                headers: { token }
                            });

                            if (verifyRes.data.success) {
                                toast.success("Payment verified successfully!");
                                getUserAppointments();
                            } else {
                                toast.error("Payment verification failed!");
                            }
                        } catch (error) {
                            console.error(error);
                            toast.error("Payment verification error!");
                        }
                    },
                    prefill: {
                        name: "Your Name",
                        email: "user@example.com",
                        contact: "9999999999",
                    },
                    theme: {
                        color: "#6366F1",
                    },
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();
            }
        } catch (error) {
            console.error(error);
            toast.error("Payment failed");
        }
    }

    useEffect(() => {
        if (token) getUserAppointments()
    }, [token])

    if (loading) return <div>Loading appointments...</div>

    return (
        <div className="p-4">
            <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>
                My Appointments
            </p>
            <div>
                {appointments.length === 0 ? (
                    <p>No appointments found</p>
                ) : (
                    appointments.map((item, index) => (
                        <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr_1fr] gap-4 py-4 border-b' key={index}>
                            <div>
                                <img className='w-32 h-32 object-cover rounded-lg bg-indigo-50' src={item.docData.image} alt='Doctor' />
                            </div>
                            <div className='text-sm text-zinc-600'>
                                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                                <p>{item.docData.speciality}</p>
                                <p className='text-zinc-700 font-medium mt-2'>Address:</p>
                                <p className='text-xs'>{item.docData.address?.line1}</p>
                                <p className='text-xs'>{item.docData.address?.line2}</p>
                                <p className='text-xs mt-2'>
                                    <span className='text-sm text-neutral-700 font-medium'>Date & Time: </span>
                                    {slotDateFormat(item.slotDate)} | {item.slotTime}
                                </p>
                            </div>
                            <div className='flex flex-col gap-2 justify-end'>
                                {!item.cancelled && !item.paid && !item.isCompleted && (
                                    <>
                                        <button onClick={() => appointmentRazorpay(item._id)} className='custom-razorpay-btn text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-indigo-500 hover:text-white transition-all duration-300'>
                                            Pay online
                                        </button>
                                        <button
                                            onClick={() => cancelAppointment(item._id)}
                                            className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-500 hover:text-white transition-all duration-300'
                                        >
                                            Cancel Appointment
                                        </button>
                                    </>
                                )}
                                {item.cancelled && !item.isCompleted && (
                                    <button className='sm:min-w-48 py-2 border border-red-500 text-red-500 rounded'>
                                        Appointment Cancelled
                                    </button>
                                )}
                                {item.paid && !item.cancelled && !item.isCompleted && (
                                    <div className='flex flex-col gap-2'>
                                        <button className='sm:min-w-48 py-2 border border-green-500 text-green-600 rounded'>
                                            Paid & Confirmed
                                        </button>
                                        <button
                                            onClick={() => cancelAppointment(item._id)}
                                            className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-500 hover:text-white transition-all duration-300'
                                        >
                                            Cancel Appointment
                                        </button>


                                    </div>
                                )}
                                {item.isCompleted && <button className='sm:min-w-48 py-2  border border-green-500 rounded text-green-500  '>Completed</button>}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default MyAppointments