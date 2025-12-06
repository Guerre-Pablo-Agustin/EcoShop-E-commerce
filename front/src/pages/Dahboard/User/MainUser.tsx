import Profile from '@/components/dashboard/users/profile'
import { useAuthStore } from '@/store/auth.store'
import { useCustomerStore } from '@/store/customer.store'
import { Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'

const MainUser = () => {

 const {user} = useAuthStore()

 const {fetchCustomerByEmail, currentCustomer, isLoading} = useCustomerStore()

 useEffect(() => {
    fetchCustomerByEmail(user?.email || '')
 }, [user])


 console.log("currentCustomer", currentCustomer)

 if(isLoading){
    return <div>
        <Loader2 className="animate-spin w-10 h-10" />
    </div>
 }

 if(!currentCustomer){
    return <div>Customer not found</div>
 }

  return (
    <div>
       <Profile  customer={currentCustomer!} />
    </div>
  )
}

export default MainUser