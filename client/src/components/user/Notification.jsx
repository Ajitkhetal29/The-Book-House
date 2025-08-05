import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'

const Notification = () => {

    const { isLoading, userNotification, getNotifications } = useContext(AppContext);

    useEffect(() => {
        getNotifications();
    }, [])

    return (
        <div className="flex-1 bg-[url('/images/notification_bg.jpg')] bg-cover bg-center mt-5 flex w-full bg-green-50 ">
            {isLoading && <p className="text-2xl text-center font-bold ">Loading..</p>}
            {userNotification.length > 0 ? (

                <div className='flex border w-full  flex-row ' >
                    <ul className='w-full'>

                        {userNotification.map(n => (
                            <li className={`px-5 py-3 flex border-b w-full justify-between ${n.type === "book_added"? 'bg-slate-200 text-white' : '' } ${n.type === "quote"? 'bg-orange-200 text-black' : '' } ${n.type === "payment"? 'bg-green-200 text-black' : '' } ${n.type === "signin"? 'bg-amber-200 text-black' : '' } ${n.type === "fine_reminder"? 'bg-red-200 text-black' : '' } ${n.type === "duedate_reminder"? 'bg-rose-200 text-black' : '' } `} key={n._id}><p>{n.text}</p> <span>{new Date(n.createdAt).toLocaleDateString()}</span> </li>
                        ))}
                    </ul>
                </div>

            ) : (<p className="text-center text-gray-500">No notifications yet.</p>)}

        </div>
    )
}

export default Notification