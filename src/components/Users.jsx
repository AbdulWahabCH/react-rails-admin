import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PiArticleMedium } from "react-icons/pi";
import { MdOutlineCommentBank } from "react-icons/md";
import { AiOutlineUserDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";

import { Link } from 'react-router-dom'



const Users = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(apiUrl + '/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
            } catch (error) {
                setError(error.response ? error.response.data.error : 'Error fetching users');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map(user => (
                <div key={user.id} className="bg-white flex gap-2 shadow-md rounded-lg p-2">
                    <img
                        src={`http://localhost:3000${user.avatar_url}`}
                        alt={user.username}
                        className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div className='flex flex-col justify-between my-2'>

                        <div className="mt-2">
                            <div className='flex justify-between items-center'>
                                <Link to={`/admin/users/${user.id}`} className="text-lg font-semibold">{user.username}</Link>
                                <span className='flex items-center gap-4'>
                                    <CiEdit className='cursor-pointer size-4' />
                                    <AiOutlineUserDelete className='cursor-pointer size-4' />
                                </span>
                            </div>
                            <p className="text-gray-600">{user.email}</p>
                            <p className="text-sm text-gray-500">Role: {user.role}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center space-x-1 text-gray-700">
                                <PiArticleMedium className="text-xl" />
                                <span>{user.post_count}</span>
                            </div>

                            <div className="flex items-center space-x-1 text-gray-700">
                                <MdOutlineCommentBank className="text-xl" />
                                <span>{user.comment_count}</span>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default Users;
