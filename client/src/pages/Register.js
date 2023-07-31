import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const initialValues = { userName: "", email: "", profilePic: "", password: "", confirmPassword: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [error, setError] = useState({});
    const [apiError, setApiError] = useState({});
    const navigate = useNavigate();
    const validation = () => {
        const { userName, email, profilePic, password, confirmPassword } = formValues;
        const newErrors = {};

        if (!userName || userName === '') newErrors.userName = "Name is required"
        if (!email || email === '') newErrors.email = "Email is required"
        if (!profilePic || profilePic === '') newErrors.profilePic = "Profile is required"
        if (!password || password === '' || password.length < 8) newErrors.password = "Password must have atleast 8 characters"
        if (!confirmPassword || confirmPassword === '') newErrors.confirmPassword = "Confirm Password is required"
        if (password && confirmPassword && (password !== confirmPassword)) newErrors.alert = "Password does not match with confirm password"
        return newErrors;

    };
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

    const handleClick = async (e) => {
        e.preventDefault();
        let formErrors = validation()
        if (Object.keys(formErrors).length > 0) {
            setError(formErrors)
        } else {
            // console.log(formValues);
            try {
                const res = await axios.post(`${process.env.REACT_APP_USER_API}/signup`, formValues);
                navigate("/signin");
                return res;
            } catch (err) {
                setApiError(err.response.data)
            }
        }
    }
    return (
        <div className='h-screen flex rounded-lg shadow-lg bg-white '>
            <div className='w-full  m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-8 px-16'>
                <h1 className='text-2xl font-medium text-primary mt-2 mb-12 text-center'>
                    Register your account 🔐
                </h1>

                <form
                >
                    <div >
                        <label htmlFor='text'>Your Name</label>
                        <input
                            type='text'
                            className="w-full p-2 text-gray-700 border border-solid border-gray-300 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 focus:border-blue-600"
                            name='userName'
                            onChange={handleChange}
                            placeholder='Your Name'
                            style={error.userName && { border: '1px solid red' }}
                        />
                        {error.userName && <p className='text-red-500 mb-4'>{error.userName}</p>}
                    </div>
                    <div >
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            className="w-full p-2 text-gray-700 border border-solid border-gray-300 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 focus:border-blue-600"
                            name='email'
                            onChange={handleChange}
                            placeholder='Your Email'
                            style={error.email && { border: '1px solid red' }}
                        />
                        {error.email && <p className='text-red-500 mb-4'>{error.email}</p>}
                    </div>
                    <div >
                        <label htmlFor='profilePicture'>Profile Picture {`(URL )`}</label>
                        <input
                            type='text'
                            className="w-full p-2 text-gray-700 border border-solid border-gray-300 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 focus:border-blue-600"
                            name='profilePic'
                            onChange={handleChange}
                            placeholder='Your Profile Picture'
                            style={error.profilePic && { border: '1px solid red' }}
                        />
                        {error.profilePic && <p className='text-red-500 mb-4'>{error.profilePic}</p>}
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            className="w-full p-2 text-primary border border-solid border-gray-300 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 focus:border-blue-600"
                            name='password'
                            onChange={handleChange}
                            placeholder='Your Password'
                            style={error.password && { border: '1px solid red' }}
                        />
                        {error.password && <p className='text-red-500 mb-4'>{error.password}</p>}
                    </div>
                    <div>
                        <label htmlFor='Confirm password'>Confirm Password</label>
                        <input
                            type='password'
                            className="w-full p-2 text-primary border border-solid border-gray-300 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 focus:border-blue-600"
                            name='confirmPassword'
                            onChange={handleChange}
                            placeholder='Confirm Password'
                            style={error.confirmPassword && { border: '1px solid red' }}
                        />
                        {error.confirmPassword && <p className='text-red-500 mb-4'>{error.confirmPassword}</p>}
                        {error.alert && <p className='text-red-500 mb-4'>{error.alert}</p>}
                    </div>
                    <div className='flex justify-center items-center mt-2 '>
                        <button
                            className="w-full bg-blue-600 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark"
                            onClick={handleClick}>
                            Register
                        </button>
                    </div>
                    <p className="text-gray-800 mt-2 text-center">Already have an account? <Link to={`/signin`}
                        className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Signin</Link>
                    </p>
                </form>
            </div>
        </div>

    );
}

export default Register