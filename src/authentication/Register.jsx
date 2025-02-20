/* eslint-disable no-unused-vars */
import Lottie from 'lottie-react';
import register from "../../public/registrationLottie.json"
import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {


    return (
        <div>
            <div className="hero min-h-[calc(100vh-120px)]">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left text-2xl">
                        <Lottie animationData={register} loop={true} className='text-2xl' />;
                    </div>
                    <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                        </form>
                        <Link className='text-center text-gray-500 hover:text-gray-600' to="/login">have an account? login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;