/* eslint-disable no-unused-vars */
import React from 'react';
import login from "../../public/loginLottie.json"
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';

const Login = () => {



    return (
        <div>
            <div className="hero min-h-[calc(100vh-120px)]">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <Lottie animationData={login} loop={true} />;
                    </div>
                    <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body">
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
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <Link className='text-center text-gray-500 hover:text-gray-600' to="/register">new here? register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login