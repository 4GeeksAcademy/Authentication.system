import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Private = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }

        const fetchPrivateData = async () => {
            try {
                const response = await fetch(process.env.BACKEND_URL + '/api/private', {
                    headers: {
                        'x-access-token': token
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setMessage(data.message);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error:', error);
                navigate('/login');
            }
        };

        fetchPrivateData();
    }, [navigate]);

    return <div>{message}</div>;
};
