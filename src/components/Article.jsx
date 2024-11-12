import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SendWarningForm from './SendWarningForm';
import { RiDeleteBin2Fill } from "react-icons/ri";

const Article = () => {
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);
    const [error, setError] = useState(null);  // Add error state

    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                if (!token) {
                    setError('No token found, please log in.');
                    return;
                }

                const res = await axios.get(`${apiUrl}/articles/${articleId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data)
                setArticle(res.data); // Set the article data
            } catch (e) {
                console.error(e);  // Log error for debugging
                setError('Failed to fetch article. Please try again later.');
            }
        };

        fetchArticle();
    }, [articleId, token, apiUrl]);

    let deleteArticle = async () => {
        const res = await axios.delete(`${apiUrl}/articles/${articleId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.status == 204) {
            navigate('/admin/articles')
        }
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl flex gap-2 items-center justify-between font-bold mb-6">{article.title}
                <span>
                    <RiDeleteBin2Fill className='cursor-pointer hover:text-red-900/70' onClick={deleteArticle} />
                </span>
            </h1>
            <p className="text-gray-700">{article.body}</p>
            <p className="mt-4 flex flex-col gap-2 text-sm text-gray-500">
                <strong>Created At:</strong> {new Date(article.created_at).toLocaleString()}

                <span>
                    By: <Link to={`/admin/users/${article.user.id}`} className="text-lg font-semibold">{article.user.username}</Link>
                </span>
            </p>
            <SendWarningForm articleId={articleId} />
        </div>
    );
};

export default Article;
