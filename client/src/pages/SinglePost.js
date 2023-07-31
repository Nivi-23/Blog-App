import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import { AuthContext } from '../context/AuthContext';

const SinglePost = () => {
    const initialValues = { title: "", description: "", imgUrl: "" }
    const [formValues, setFormValues] = useState(initialValues);

    const [singleBlog, setSingleBlog] = useState([]);
    const [updateMode, setUpdateMode] = useState(false);
    const [loading, setLoading] = useState(false);
    let { blogId } = useParams();
    const { user } = useContext(AuthContext);
    // console.log(blogId);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => {
            return { ...prevState, [name]: value }
        });
        // if (error[name]) {
        //     setError({ ...error, [name]: null })
        // }
    }
    useEffect(() => {
        const fetchBlogByID = async () => {
            // let formErrors = validation()
            // if (Object.keys(formErrors).length > 0) {
            //     setError(formErrors)
            // }
            // else {
            setLoading(true);
            try {
                const res = await axios.get(`${process.env.REACT_APP_BLOG_API}/${blogId}`);
                setTimeout(() => {
                    setLoading(false);
                }, 200)

                setSingleBlog(res.data);
                setFormValues(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        // }

        fetchBlogByID();
    }, [blogId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log(formValues);
        try {
            const res = await axios.put(
                `${process.env.REACT_APP_BLOG_API}/updateBlog/${blogId}`,
                {
                    title: formValues.title,
                    image: formValues.imgUrl,
                    description: formValues.description,
                    author: user?.user.userName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            window.location.reload("/");
            return res;
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            {loading ? <div className="text-center mt-12">
                <div role="status">
                    <svg className="inline w-full h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="text-blue-600 text-base">Loading...</span>
                </div>
            </div> : <div className='container mx-auto px-4 '>
                <div className='flex flex-wrap justify-center mt-4 p-2'>
                    {!updateMode && <img
                        src={singleBlog.image}
                        alt={singleBlog.title}
                        className='rounded h-64 w-full object-cover sm:h-80 sm:w-3/4'
                    />}

                </div>
                <div className='flex  justify-between items-center mx-auto   sm:w-3/4 mb-2'>

                    {/* <div class="grid grid-rows-3 grid-cols-1 "> */}
                    <div className='flex justify-between items-center ' >
                        <img
                            src={singleBlog.image}
                            alt="Profile picture"
                            className='w-10 h-10 rounded-full object-cover'
                        />&nbsp;
                        <div className='flex flex-col'>
                            <span className='font-sans text-base font-semibold text-indigo-600'>{singleBlog.author}</span>
                            <span className='font-semibold text-blue-700'>{new Date(singleBlog.updatedAt).toDateString()}</span>
                        </div>
                    </div>
                    <div  >
                        {user && singleBlog.author === user?.user.userName && (<span className='text-base font-bold text-green-600 cursor-pointer' onClick={() => setUpdateMode(true)}>Edit</span>)}&nbsp;&nbsp;
                        {updateMode && <span className='font-bold text-amber-600 cursor-pointer' onClick={() => setUpdateMode(false)}>Cancel</span>}
                        {/* <span className='font-bold text-amber-600'>Delete</span> */}
                    </div>
                    {/* </div> */}

                </div>
                {updateMode ? <div className='flex  justify-between items-center mx-auto   sm:w-3/4 mb-2'>
                    <input
                        type="text"
                        name="title"
                        className="w-full bg-gray-200 rounded
                font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 py-3
                px-4 mb-3 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        value={formValues.title}
                        // placeholder="name@example.com"
                        onChange={handleChange}
                    // style={error.title && { border: '1px solid red' }} 
                    /></div> : <p className='text-center font-medium text-xl font-sans mt-2'>{singleBlog.title}</p>}
                {/* {error.title && <p className='text-red-500 mb-4'>{error.title}</p>} */}

                {/* image */}
                {updateMode && <div className='flex  justify-between items-center mx-auto   sm:w-3/4 mb-2'>
                    <input
                        type="text"
                        name="imgUrl"
                        placeholder="Image Url"
                        value={formValues.imgUrl}
                        className="w-full bg-gray-200 rounded
                font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 py-3
                px-4 mb-3 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

                        // placeholder="name@example.com"
                        onChange={handleChange}
                    // style={error.imgUrl && { border: '1px solid red' }}

                    />
                    {/* {error.imgUrl && <p className='text-red-500 mb-4'>{error.imgUrl}</p>} */}
                </div>}

                {/* description */}
                <div className='w-full mt-2 sm:mx-auto sm:w-3/4'>
                    {updateMode ? <textarea className="w-full bg-gray-200 rounded
                font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 py-3
                px-4 mb-3 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        name="description"
                        value={formValues.description}
                        onChange={handleChange}
                        placeholder="Leave a comment here"
                        rows={6}
                        cols={50}
                        style={{ border: '1px solid gray' }} /> : <p className='font-normal text-base font-sans text-justify '>
                        {singleBlog.description}
                    </p>}
                    {updateMode && <div className='flex pb-2'>
                        <button
                            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleUpdate}>
                            Update
                        </button></div>
                    }
                </div>

            </div>}
        </>
    )
}

export default SinglePost