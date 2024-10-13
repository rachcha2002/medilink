import React from 'react'
import PayOnline from '../../Components/Payments/PayOnline'
import PaymentHistory from '../../Components/Payments/PaymentHistory'
import { useAuthContext } from '../../Context/AuthContext'


const PayementsFullPage = () => {
    const { user,isLoggedIn } = useAuthContext()
  return (
   <>
    <PayOnline/>
    {isLoggedIn &&
    <PaymentHistory/>

}   
    </>
  
  )
}

export default PayementsFullPage