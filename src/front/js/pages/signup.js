import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(process.env.BACKEND_URL + '/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                navigate('/login');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase">Signup</h2>
                                    <p className="text-white-50 mb-5">Please enter your email and password to create an account!</p>

                                    <form onSubmit={handleSubmit}>
                                        <div className="form-outline form-white mb-4">
                                            <input
                                                type="email"
                                                id="typeEmailX"
                                                className="form-control form-control-lg"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <label className="form-label" htmlFor="typeEmailX">Email</label>
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input
                                                type="password"
                                                id="typePasswordX"
                                                className="form-control form-control-lg"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <label className="form-label" htmlFor="typePasswordX">Password</label>
                                        </div>

                                        <button className="btn btn-outline-light btn-lg px-5" type="submit">Signup</button>
                                    </form>
                                </div>

                                <div>
                                    <p className="mb-0">Already have an account? <a href="/login" className="text-white-50 fw-bold">Login</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
