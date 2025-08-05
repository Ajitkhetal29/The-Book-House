import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const VerifyPayment = () => {

    const { backendUrl } = useContext(AppContext);
    const [searchparams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying payment..')

    const success = searchparams.get("success");
    const userId = searchparams.get("userId");

    const verifyPayment = async () => {
        if (success === "true" && userId) {
            try {
                const response = await axios.post(`${backendUrl}/payment/verify-fine`, { userId })
                console.log(response);

                if (response.data.success) {
                    toast.success("Fine payment Successful")
                    navigate('/profile')
                } else {
                    toast.error(response.data.message)
                }

            } catch (err) {
                console.log(err);

            }
        } else {
            console.log(console.error())

        }

    };

    useEffect(() => {

        verifyPayment()

    }, [searchparams])

    return (
        <div></div>
    )
}

export default VerifyPayment