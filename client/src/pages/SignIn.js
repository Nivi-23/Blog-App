import React, { useState, useContext } from 'react';
import axios from "axios";
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import {
    LoginFailure,
    LoginStart,
    LoginSuccess,
} from "../context/AuthAction";
const SignIn = () => {

    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [error, setError] = useState({});
    const [apiError, setApiError] = useState({});
    const { dispatch } = useContext(AuthContext);

    //siginin api
    const signinApi = process.env.REACT_APP_USER_API;
    const { user } = useContext(AuthContext);
    //input validation method
    const validation = () => {
        const { email, password } = formValues;
        const newErrors = {};

        if (!email || email === '') newErrors.email = "Please check your email"
        if (!password || password === '') newErrors.password = "Please check your password"
        return newErrors;

    };

    //method for updating input values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setApiError({});
        setFormValues(prevState => {
            return { ...prevState, [name]: value }
        });

        if (error[name]) {
            setError({ ...error, [name]: null })
        }
    };

    //method for handling login process
    const handleSumbit = async (e) => {
        e.preventDefault();
        let formErrors = validation()
        if (Object.keys(formErrors).length > 0) {
            setError(formErrors)
        }
        else {
            // navigate("/secondPage", { state: formValues })
            dispatch(LoginStart());
            try {
                const res = await axios.post(`${signinApi}/signin`, {
                    email: formValues.email,
                    password: formValues.password,
                });
                dispatch(LoginSuccess(res.data));

            } catch (err) {
                dispatch(LoginFailure());
                setApiError(err.response.data)
                // console.log(err.response.data);
            }
            setFormValues(initialValues)

        }
    }
    return (
        <>
            {user ? <Navigate to="/" replace={true} /> :
                <div className='h-screen flex rounded-lg shadow-lg bg-white '>
                    <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                        <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                            Log in to your account 🔐
                        </h1>

                        <form
                        >
                            <div >
                                <label htmlFor='email'>Email</label>
                                <input
                                    type='email'
                                    className="w-full p-2 text-gray-700  
                       rounded-md outline-none text-sm 
                       transition duration-150 ease-in-out mb-4 
                       bg-gray-200 focus:border-blue-600"
                                    name='email'
                                    value={formValues.email}
                                    onChange={handleChange}
                                    placeholder='Your Email'
                                    style={{ border: error.email ? '1px solid red' : "1px solid gray" }}
                                    required
                                />
                                {error.email && <p className='text-red-500 mb-4'>{error.email}</p>}
                            </div>
                            <div>
                                <label htmlFor='password'>Password</label>
                                <input
                                    type='password'
                                    className="w-full p-2 text-primary  rounded-md 
                       outline-none text-sm transition duration-150
                       ease-in-out mb-2 bg-gray-200 focus:border-blue-600"
                                    name='password'
                                    value={formValues.password}
                                    onChange={handleChange}
                                    placeholder='Your Password'
                                    style={{ border: error.password ? '1px solid red' : "1px solid gray" }}
                                />
                                {error.password && <p className='text-red-500 '>{error.password}</p>}
                            </div>
                            {apiError && <span className='font-bold text-red-600'>{apiError.message}</span>}
                            <div className='flex justify-center items-center mt-2 '>
                                <button
                                    className="w-full bg-blue-600 py-2 px-4 text-base font-bold text-zinc-200 rounded border border-green focus:outline-none focus:border-green-dark"
                                    onClick={handleSumbit}
                                >
                                    Signin
                                </button>
                            </div>
                            <p className="text-gray-800 mt-2 text-center">Not a member? <Link to={`/register`}
                                className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Register</Link>
                            </p>
                        </form>
                    </div>
                </div>
            }
        </>


    );


}

export default SignIn