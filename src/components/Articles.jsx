// src/components/Articles.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/admin/articles/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch articles');
                }

                const data = await response.json();
                setArticles(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-600 text-center p-4">Error: {error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Articles</h1>
            <ul className="space-y-4">
                {articles.map((article) => (
                    <li key={article.id} className="border rounded-lg shadow-md p-4 bg-white">
                        <Link to={`${article.id}`} className="text-xl font-semibold">{article.title}</Link>
                        <p className="mt-2 text-gray-700">{article.body}</p>
                        <p className="mt-4 text-sm text-gray-500">
                            <strong>Created At:</strong> {new Date(article.created_at).toLocaleString()}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Articles;
