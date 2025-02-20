/* eslint-disable no-unused-vars */
import Lottie from 'lottie-react';
import register from "../../public/registrationLottie.json"
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import { SiGnuprivacyguard } from 'react-icons/si';
import { GoogleAuthProvider } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider()

const Register = () => {

    const { createUser, googleLogin } = useAuth()

    const handleSubmit = e => {
        e.preventDefault()

        const form = e.target
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;


        createUser(email, password)
            .then((user) => {
                console.log("New user registered --> ", user?.user)
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
                    <div className="text-center lg:text-left text-2xl">
                        <Lottie animationData={register} loop={true} className='text-2xl' />;
                    </div>
                    <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    name='name'
                                    type="text"
                                    placeholder="name"
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    name='email'
                                    type="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    name='password'
                                    type="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn"><SiGnuprivacyguard />Register</button>
                                <button onClick={handleGoogleLogin} className='btn ml-1'><FcGoogle className='text-2xl' />Google</button>
                            </div>
                        </form>
                        <Link className='text-center py-3 text-gray-500 hover:text-gray-600' to="/login">have an account? login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;