
import React, { useEffect } from 'react'
import {
  Archive,
  Leaf,
  Loader2
} from "lucide-react"
import { useAuthStore } from '@/store/auth.store'
import { useCustomerStore } from '@/store/customer.store'
import MainUser from './User/MainUser'
import BrandMain from '@/components/dashboard/main/BrandMain'
import CustomerMain from '@/components/dashboard/main/CustomerMain'

const IndexDasboard = () => {

   const {user} = useAuthStore()
  
 

  return (
    <div>
   {user?.userType === 'CUSTOMER' ? <CustomerMain /> : <BrandMain />}
    </div>
  )
}

export default IndexDasboard