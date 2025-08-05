import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import getUserFromToken from '../utils/auth';


const Login = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const user = getUserFromToken();

        if (user) {
            if (user.role === "admin") {
                navigate("/admin");
            } else if (user.role === "user") {
                navigate("/user");
            }
        } else {
            navigate("/");
        }
    }, []);


    const { signup, login } = useContext(AppContext);

    const [name, setName] = useState('');
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [currentState, setCurrentState] = useState('Sign Up')

    const onSubmitHandler = async (e) => {

        e.preventDefault()

        if (currentState === "Sign Up") {

            signup(name, email, password)

        }
        else {
            login(email, password)
        }

    }

    return (
        <>
            <div className='flex-1 bg-[url("/images/background_login.jpg")] bg-cover bg-center flex items-center justify-center  '>

                <form onSubmit={onSubmitHandler} className='bg-white rounded px-8 pt-6 w-full max-w-md '>

                    <div className='mb-6 text-center'>
                        <h1 className='text-2xl font-bold text-gray-800'>{currentState}</h1>
                    </div>

                    {currentState === "Sign Up" && (
                        <div className='mb-6 text-center'>
                            <input type="text" placeholder='Enter Name'
                                required value={name} onChange={(e) => setName(e.target.value)}
                                className='w-full px-4 py-2 border border-gray-300 rounded'
                            />
                        </div>
                    )}

                    <div className='mb-6 text-center'>
                        <input type="text" placeholder='Enter Email'
                            required value={email} onChange={(e) => setemail(e.target.value)}
                            className='w-full px-4 py-2 border border-gray-300 rounded'
                        />
                    </div>

                    <div className='mb-6 text-center'>
                        <input type="text" placeholder='Enter Password'
                            required value={password} onChange={(e) => setPassword(e.target.value)}
                            className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-200'
                        />
                    </div>

                    <div className='mb-6 text-center text-sm text-gray-600'>
                        {currentState === "Sign Up" ? <p>Already Have Account ? <span className='text-blue-700 cursor-pointer' onClick={(e) => setCurrentState("Login")} >Login here..</span></p> : <p >Don't Have Account ? <span className='text-blue-700 cursor-pointer' onClick={(e) => setCurrentState("Sign Up")} >Register here..</span></p>}
                    </div>

                    <div className='mb-6 text-center'>
                        <button className='w-full cursor-pointer rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 py-3' type='submit' >{currentState}</button>
                    </div>

                </form>


            </div>
        </>
    )
}

export default Login