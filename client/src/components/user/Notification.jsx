import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'

const Notification = () => {

    const { isLoading, userNotification, getNotifications } = useContext(AppContext);

    useEffect(() => {
        getNotifications();
    }, [])

    return (
        <div className="flex-1  mt-5 flex w-full bg-green-50 ">
            {isLoading && <p className="text-2xl text-center font-bold ">Loading..</p>}
            {userNotification.length > 0 ? (

                <div className='flex border w-full  flex-row ' >
                    <ul className='w-full'>

                        {userNotification.map(n => (
                            <li className={`px-5 py-3 flex border-b w-full justify-between ${n.type === "book_added"? 'bg-slate-500 text-white' : '' } ${n.type === "quote"? 'bg-orange-300 text-black' : '' } `} key={n._id}><p>{n.text}</p> <span>{new Date(n.createdAt).toLocaleDateString()}</span> </li>
                        ))}
                    </ul>
                </div>

            ) : (<p className="text-center text-gray-500">No notifications yet.</p>)}

        </div>
    )
}

export default Notification