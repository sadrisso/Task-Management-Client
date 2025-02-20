/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import login from "../../public/loginLottie.json"
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import { CiLogin } from 'react-icons/ci';
import { GoogleAuthProvider } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider()

const Login = () => {

    const { loginUser, loading, googleLogin } = useAuth()

    const handleSubmit = e => {
        e.preventDefault()

        const form = e.target
        const email = form.email.value;
        const password = form.password.value;


        loginUser(email, password)
            .then((user) => {
                console.log("New user login --> ", user?.user)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleGoogleLogin = () => {
        googleLogin(googleProvider)
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <div className="hero min-h-[calc(100vh-120px)]">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <Lottie animationData={login} loop={true} />;
                    </div>
                    <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name='password' type="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn"><CiLogin className='text-2xl' />Login</button>
                                <button onClick={handleGoogleLogin} className='btn ml-1'><FcGoogle className='text-2xl' />Google</button>
                            </div>
                        </form>
                        <Link className='text-center py-3 text-gray-500 hover:text-gray-600' to="/register">new here? register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login