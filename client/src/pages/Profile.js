import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';



const Profile = () => {
    const { user } = useContext(AuthContext);

    return (

        <>
            {user && <div className="container mx-auto mt-12 ">
                <div className=' flex justify-center '>
                    <img
                        alt={user.user.id}
                        src={user.user.profilePic}
                        className="w-16 h-16   rounded radius md:w-96 md:h-96"
                    />&nbsp;&nbsp;
                    <div className='flex flex-col justify-center '>
                        <h3 className="text-base font-semibold leading-normal mb-2 text-gray-800  md:text-4xl self-center">
                            Name  :  {user?.user.userName}
                        </h3>
                        <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase self-center">
                            <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                            Email : {user.user.email}
                        </div>
                        <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase self-center">
                            <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                            Joined : {new Date(user.user.date).toDateString()}
                        </div>
                    </div>
                </div>
            </div>}
        </>



    )
}

export default Profile