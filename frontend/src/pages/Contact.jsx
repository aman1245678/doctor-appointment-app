import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
    return (
        <div className='bg-gray-50 py-12'>
            {/* Heading */}
            <div className='text-center text-2xl pt-10 text-gray-500'>
                <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
            </div>

            {/* Content Container */}
            <div className='flex flex-col justify-center items-center md:flex-row gap-10 mb-28 text-sm px-6 max-w-6xl mx-auto'>
                {/* Image */}
                <img
                    className='w-full md:max-w-[360px] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'
                    src={assets.contact_image}
                    alt='Contact Us'
                />

                {/* Contact Details */}
                <div className='flex flex-col justify-center items-start gap-6 bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                    <p className='font-semibold text-lg text-gray-600'>Our OFFICE</p>
                    <p className='text-gray-500'>
                        5777111 Parsa Station<br />
                        Suite 350, Sarn, Bihar, India
                    </p>
                    <p className='text-gray-500'>
                        Tel: (415) 555-0132<br />
                        Email: aman@gmail.com
                    </p>

                    {/* Careers Section */}
                    <div className='mt-4'>
                        <p className='font-semibold text-gray-600'>Careers at JEEWANDEEP</p>
                        <p className='text-gray-500 mt-2'>
                            Learn more about our teams and job openings.
                        </p>
                        <button className='border border-black px-8 py-3 text-sm mt-4 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-500'>
                            Explore Jobs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;