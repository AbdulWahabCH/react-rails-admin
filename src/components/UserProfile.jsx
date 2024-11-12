import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
function UserProfile() {
    const { userId } = useParams(); // Get userId from the URL
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL;
    let backEnd = "http://localhost:3000/"


    useEffect(() => {

        const fetchUserData = async () => {
            try {
                const response = await axios.get(apiUrl + '/users/' + userId, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const userData = response.data;
                console.log(userData)
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };


        fetchUserData();
    }, [userId]);

    const handleEdit = () => {
        navigate(`/admin/users/${userId}/edit`);
    };

    const handleDelete = async () => {
        try {
            let response = await axios.delete(apiUrl + '/users/' + userId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/admin/users');
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    if (!user) return <div>Loading...</div>;
    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <img src={backEnd + user.avatar_url} alt={user.username} className="w-16 h-16 object-cover rounded-full mr-4" />
                    <h2 className="text-2xl font-semibold">{user.username}</h2>
                </div>
                <div className="space-x-2">
                    <button
                        onClick={handleEdit}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between">
                    <span className="font-semibold">Email:</span>
                    <span>{user.email}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">Role:</span>
                    <span>{user.role}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">Posts:</span>
                    <span>{user.post_count}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">Comments:</span>
                    <span>{user.comment_count}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">Created At:</span>
                    <span>{new Date(user.created_at).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
