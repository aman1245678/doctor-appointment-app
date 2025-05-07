import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
    return (
        <div className='bg-gray-50 py-12'>
            {/* Heading */}
            <div className='text-center text-2xl pt-10 text-gray-500'>
                <p>
                    ABOUT <span className='text-gray-700 font-semibold'>US</span>
                </p>
            </div>

            {/* About Content */}
            <div className='my-10 flex flex-col md:flex-row gap-12 max-w-6xl mx-auto px-6'>
                {/* Image */}
                <img
                    className='w-full md:max-w-[360px] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'
                    src={assets.about_image}
                    alt='About Us'
                />

                {/* Text Content */}
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                    <p className='text-lg'>
                        Welcome to Jeewandeep, your trusted partner in managing your healthcare.
                    </p>
                    <p className='text-lg'>
                        Jeewandeep is committed to excellence in healthcare technology. We continuously strive to provide the best solutions for your health needs.
                    </p>
                    <b className='text-gray-800 text-xl'>Our Vision</b>
                    <p className='text-lg'>
                        Our vision is clear: to protect your health and ensure you trust Jeewandeep as your reliable healthcare partner.
                    </p>
                </div>
            </div>

            {/* Why Choose Us Heading */}
            <div className='text-center text-2xl my-8 text-gray-500'>
                <p>
                    WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span>
                </p>
            </div>

            {/* Why Choose Us Cards */}
            <div className='flex flex-col md:flex-row gap-6 max-w-6xl mx-auto px-6 mb-20'>
                {/* Efficiency Card */}
                <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg shadow-md hover:shadow-lg'>
                    <b className='text-lg'>Efficiency:</b>
                    <p>
                        Streamlined appointment scheduling that fits into your busy lifestyle.
                    </p>
                </div>

                {/* Convenience Card */}
                <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg shadow-md hover:shadow-lg'>
                    <b className='text-lg'>Convenience:</b>
                    <p>
                        Access to a network of trusted healthcare professionals in your area.
                    </p>
                </div>

                {/* Personalization Card */}
                <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg shadow-md hover:shadow-lg'>
                    <b className='text-lg'>Personalization:</b>
                    <p>
                        Tailored recommendations and reminders to help you stay on top of your health.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;