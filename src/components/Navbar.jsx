import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import { HiMiniUserCircle } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";

import avaImg from "../assets/imgAv.png"
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';


const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Your Cart", href: "/cart" },
]

const Navbar = () => {

    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const cartItems = useSelector(state => state.cart.cartItems)
    console.log(cartItems)

    const { currentUser, logOut } = useAuth()

    // logout 
    const handleLogOut = () => {
        logOut()
    }

    return (
        <header className='max-w-screen-2xl mx-auto px-4 py-6'>
            <nav className='flex justify-between items-center px-4'>
                {/* left side */}
                <div className='flex items-center md:gap-16 gap-4'>
                    <Link to="/">
                        <HiMiniBars3CenterLeft className='size-6' />
                    </Link>
                    {/* Search input */}
                    <div className='relative sm:w-72 w-40 space-x-2'>
                        <FiSearch className='absolute inline-block left-3 inset-y-2 size-4' />
                        <input type="text"
                            placeholder='What are you looking for?'
                            className='w-full py-1 md:px-8 px-6 rounded-md bg-[#EAEAEA] focus:outline-none'
                        />
                    </div>
                </div>
                {/* right side  */}
                <div className='flex items-center relative md:space-x-3 space-x-2'>
                    <div>
                        {
                            currentUser ? <>
                                <button onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                                    <img src={avaImg} alt='avatar' className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`} />
                                </button>
                                {/* Display Dropdowns */}
                                {
                                    isDropDownOpen && (
                                        <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                                            <ul className='py-2'>
                                                {
                                                    navigation.map((item) => (
                                                        // setting the dropdown to close after clicking desired page
                                                        <li key={item.name} onClick={() => setIsDropDownOpen(false)}>
                                                            <Link to={item.href} className='block px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300'>
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                                <li>
                                                    <button
                                                        onClick={handleLogOut}
                                                        className='block w-full text-left px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300'>Logout</button>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                }

                            </> : <Link to="/login"><HiMiniUserCircle className='size-6' /></Link>
                        }
                    </div>
                    <button className='hidden sm:block'>
                        <FaRegHeart className='size-6' />
                    </button>
                    <Link to='/cart' className='bg-primary hover:bg-blue-400 p-1 sm:px-6 px-2 flex items-center rounded-md'>
                        <TiShoppingCart className='size-6' />
                        {
                            cartItems.length > 0 ? <span className='text-sm font-semibold sm:ml-1'>{cartItems.length}</span> : <span className='text-sm font-semibold sm:ml-1'>0</span>
                        }
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar