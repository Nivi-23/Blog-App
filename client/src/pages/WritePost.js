import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const WritePost = () => {

    const initialValues = { title: "", description: "", imgUrl: "" }
    const [formValues, setFormValues] = useState(initialValues);
    const [error, setError] = useState({});
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [apiError, setApiError] = useState({});
    //input validation method
    const validation = () => {
        const { title, description, imgUrl } = formValues;
        const newErrors = {};

        if (!title || title === '') newErrors.title = "Please check your title"
        if (!description || description === '') newErrors.description = "Please check your description"
        if (!imgUrl || imgUrl === '') newErrors.imgUrl = "Please check your image field"
        return newErrors;

    };

    //method for updating input values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => {
            return { ...prevState, [name]: value }
        });
        if (error[name]) {
            setError({ ...error, [name]: null })
        }
    }

    //submit method
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formErrors = validation()
        if (Object.keys(formErrors).length > 0) {
            setError(formErrors)
        }
        else {
            // console.log(formValues)
            // console.log("submitted");
            try {
                const res = await axios.post(`${process.env.REACT_APP_BLOG_API}/createPost`, {
                    title: formValues.title,
                    image: formValues.imgUrl,
                    description: formValues.description,
                    author: user?.user.userName,
                    email: user?.user.email
                }, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                if (res) navigate('/');

                console.log(res);
            } catch (err) {
                setApiError(err.response.data)
                // console.log(err);
            }
            setFormValues(initialValues);
        }
    }
    return (
        <>
            {user && <div className=" mx-auto max-w-6xl py-20 px-12 lg:px-24  mb-24">
                <h2 className="font-bold text-xl pb-2 text-gray-600">Write Your Post Here</h2>
                <form onSubmit={handleSubmit}>
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                        <div className="-mx-3 md:flex mb-6">
                            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold  mb-2"
                                    htmlFor="Title">
                                    Title*
                                </label>
                                <input className="w-full bg-gray-200 rounded
                            font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 py-3
                            px-4 mb-3 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    name="title"
                                    value={formValues.title}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Post Title"
                                    style={error.title && { border: '1px solid red' }}
                                />
                                {error.title && <p className='text-red-500 mb-4'>{error.title}</p>}
                            </div>
                            <div className="md:w-1/2 px-3">
                                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold  mb-2" htmlFor="Image url">
                                    Image Url*
                                </label>
                                <input className="w-full bg-gray-200 rounded
                            font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 py-3
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none px-4 mb-3"
                                    type="text"
                                    name="imgUrl"
                                    value={formValues.imgUrl}
                                    onChange={handleChange}
                                    placeholder="Image Url"
                                    style={error.imgUrl && { border: '1px solid red' }} />
                                {error.imgUrl && <p className='text-red-500 mb-4'>{error.imgUrl}</p>}
                            </div>
                        </div>
                        <div className="-mx-3 md:flex mb-6">
                            <div className="md:w-full px-3">
                                <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="description">
                                    Description*
                                </label>
                                <textarea className="w-full bg-gray-200 
                            font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                             rounded py-3 px-4 mb-2 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    name="description"
                                    value={formValues.description}
                                    onChange={handleChange}
                                    placeholder="Leave a comment here"
                                    rows={4}
                                    cols={50}
                                    style={error.description && { border: '1px solid red' }} />
                                {error.description && <p className='text-red-500 mb-4'>{error.description}</p>}
                            </div>
                        </div>
                        {apiError && <span className='font-bold text-red-600'>{apiError.message}</span>}
                        <div className="-mx-3 md:flex">
                            <div className="md:w-full px-3">

                                <button
                                    className="w-full bg-blue-600 py-2 px-4
                                 text-md font-bold
                                text-white rounded border border-green 
                                focus:outline-none focus:border-green-dark"

                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>}

        </>
    )
}

export default WritePost