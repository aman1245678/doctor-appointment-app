import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify'; // Added missing import

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const { token, setToken, userData } = useContext(AppContext);

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
        navigate('/');
        toast.success('Logged out successfully');
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400'>
            <img
                onClick={() => navigate('/')}
                src={assets.own_log} // Changed from assets to assets.logo
                className='w-44 cursor-pointer'
                alt="Logo"
            />

            {/* Hamburger Menu Icon for Mobile */}
            <div className='md:hidden cursor-pointer' onClick={toggleMenu}>
                <img
                    src={showMenu ? assets.cross_icon : assets.menu_icon}
                    alt="Menu"
                    className='w-8'
                />
            </div>

            {/* Navigation Links - Desktop */}
            <ul className='hidden md:flex items-center gap-5 font-medium'>
                <NavLink to='/'>
                    <li className='py-1'>Home</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto' />
                </NavLink>
                <NavLink to='/doctors'>
                    <li className='py-1'>All Doctors</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto' />
                </NavLink>
                <NavLink to='/about'>
                    <li className='py-1'>About</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto' />
                </NavLink>
                <NavLink to='/contact'>
                    <li className='py-1'>Contact</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto' />
                </NavLink>
            </ul>

            {/* Profile Dropdown and Login Button */}
            <div className='flex items-center gap-4'>
                {token && userData ? (
                    <div className='relative'>
                        <div
                            className='flex items-center gap-2 cursor-pointer'
                            onClick={toggleDropdown}
                        >
                            <img
                                className='w-8 rounded-full'
                                src={userData.image || assets.default_profile}
                                alt='Profile'
                            />
                            <img
                                className='w-2.5'
                                src={assets.dropdown_icon}
                                alt='Dropdown'
                            />
                        </div>
                        {showDropdown && (
                            <div className='absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
                                <div className='p-4 space-y-2'>
                                    <p
                                        onClick={() => {
                                            navigate('/my-profile');
                                            setShowDropdown(false);
                                        }}
                                        className='cursor-pointer hover:text-primary'
                                    >
                                        My Profile
                                    </p>
                                    <p
                                        onClick={() => {
                                            navigate('/my-appointments');
                                            setShowDropdown(false);
                                        }}
                                        className='cursor-pointer hover:text-primary'
                                    >
                                        My Appointments
                                    </p>
                                    <p
                                        onClick={logout}
                                        className='cursor-pointer hover:text-primary'
                                    >
                                        Logout
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className='bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-light hidden md:block'
                    >
                        Create Account
                    </button>
                )}
            </div>

            {/* Mobile Menu - Only shown when showMenu is true */}
            {showMenu && (
                <div className='fixed inset-0 z-20 bg-white md:hidden'>
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img className='w-36' src={assets.logo} alt="Logo" />
                        <img
                            className='w-7 cursor-pointer'
                            onClick={toggleMenu}
                            src={assets.cross_icon}
                            alt="Close"
                        />
                    </div>
                    <ul className='flex flex-col items-center gap-4 mt-8 px-5 text-lg font-medium'>
                        <NavLink
                            to='/'
                            onClick={toggleMenu}
                            className="px-4 py-2 rounded inline-block w-full text-center"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to='/doctors'
                            onClick={toggleMenu}
                            className="px-4 py-2 rounded inline-block w-full text-center"
                        >
                            All Doctors
                        </NavLink>
                        <NavLink
                            to='/about'
                            onClick={toggleMenu}
                            className="px-4 py-2 rounded inline-block w-full text-center"
                        >
                            About
                        </NavLink>
                        <NavLink
                            to='/contact'
                            onClick={toggleMenu}
                            className="px-4 py-2 rounded inline-block w-full text-center"
                        >
                            Contact
                        </NavLink>
                        {!token && (
                            <button
                                onClick={() => {
                                    navigate('/login');
                                    toggleMenu();
                                }}
                                className='bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-light mt-4'
                            >
                                Create Account
                            </button>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;