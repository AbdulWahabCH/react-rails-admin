import React, { useState } from 'react';
import axios from 'axios';

const SendWarningForm = ({ articleId }) => {
    const [message, setMessage] = useState('');
    const [warningType, setWarningType] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${apiUrl}/articles/${articleId}/send_warning`, {
                message,
                warning_type: warningType
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setResponseMessage('Warning sent successfully!');
        } catch (error) {
            setResponseMessage('Failed to send warning. Please try again.');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Send Warning to User</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="warning-type" className="block text-sm font-medium text-gray-700">Warning Type:</label>
                    <input
                        id="warning-type"
                        type="text"
                        value={warningType}
                        onChange={(e) => setWarningType(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="4"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Send Warning
                    </button>
                </div>
            </form>
            {responseMessage && (
                <p className={`mt-4 text-sm ${responseMessage.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                    {responseMessage}
                </p>
            )}
        </div>
    );
};

export default SendWarningForm;
