import React, { useState } from 'react';
import { Link, Outlet, NavLink, useNavigate } from 'react-router-dom';

function Admin() {
    let user = JSON.parse(localStorage.getItem('user'));
    let navigate = useNavigate();
    const logout = () => {
        navigate('/');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('expiration');
    };
    return (
        <div className=" flex jusitfy-between">
            <div className="w-4/12 fixed left-0 flex flex-col justify-between  w-64 h-screen px-2 py-8">

                <ul className='flex flex-col gap-2'>
                    <div className='h-6/12 flex flex-col justify-center items-center gap-2 mb-2'>
                        <img src={`http://localhost:3000${user.avatar_url}`} className='h-20 w-20 rounded-lg object-cover' />
                        <div className='text-xs float-left'>
                            <h2 className="font-semibold">{user.username}</h2>
                            <span className="text-xs text-gray-500">{user.role}</span>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                    </div>

                    <li>
                        <NavLink
                            to="/admin/users"
                            className={({ isActive }) =>
                                `flex items-center gap-2 rounded-lg px-6 py-4 text-gray-700 ${isActive ? 'bg-gray-100' : ''}`
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-5 opacity-75"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>

                            <span className="text-sm font-medium"> Users </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/articles"
                            className={({ isActive }) =>
                                `flex items-center gap-2 rounded-lg px-6 py-4 text-gray-700 ${isActive ? 'bg-gray-100' : ''}`
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-5 opacity-75"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>

                            <span className="text-sm font-medium"> Articles </span>
                        </NavLink>
                    </li>



                    <li>
                        <Link
                            to="/admin/comments"
                            className="flex items-center gap-2 rounded-lg px-6 py-4 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-5 opacity-75"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                />
                            </svg>

                            <span className="text-sm font-medium"> Comments </span>
                        </Link>
                    </li>



                </ul>
                <div className='mx-auto'>

                    <a
                        className="group relative inline-block text-sm font-medium text-gray-600 focus:outline-none focus:ring active:text-gray-500"
                        href="#"
                    >
                        <span
                            className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-gray-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                        ></span>

                        <span onClick={logout} className="relative block border border-current bg-white px-8 py-3"> Logout </span>
                    </a>

                </div>
            </div>
            <div className='w-full px-2 py-8 ml-[20%]'>
                <Outlet />
            </div>
        </div>
    );
}

export default Admin;