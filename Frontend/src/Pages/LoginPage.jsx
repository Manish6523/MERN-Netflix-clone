import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authUser.js'

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { login } = useAuthStore()

    const handleSignup = (e) => {
        e.preventDefault()
        login({email,password})
    }
    return (
        <>
            <div className='hero-bg h-screen w-screen bg-cover'>
                <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
                    <Link to={"/"}>
                        <img src="./netflix-logo.png" alt="logo" className='w-40' />
                    </Link>
                </header>
                <div className='flex justify-center items-center mt-20 mx-3'>
                    <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
                        <h1 className='text-center text-white font-bold text-xl mb-4'>Login</h1>

                        <form onSubmit={handleSignup} className='space-y-4'>
                            <div>
                                <label htmlFor="email" className='text-sm font-medium text-gray-300 block'>
                                    Email
                                </label>
                                <input type="email" id="email" placeholder='xyz@mail.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='
                                    w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-transparent text-white focus:outline-none focus:ring 
                                '/>
                            </div>
                            <div>
                                <label htmlFor="password" className='text-sm font-medium text-gray-300 block'>
                                    Password
                                </label>
                                <input type="password" id="password" placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                 className='
                                    w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-transparent text-white focus:outline-none focus:ring 
                                '/>
                            </div>
                            <button className='w-full py-2 text-white bg-red-600 font-semibold rounded-md hover:bg-red-600'>Login</button>
                        </form>
                        <div className='text-center text-gray-700'>
                            Don't have an account? {" "}
                            <Link to={"/signup"} className='text-red-500 hover:underline'>
                            Sign up
                            </Link>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default LoginPage
