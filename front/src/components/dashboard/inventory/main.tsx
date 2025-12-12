"use client"

import React, { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { DataTable } from './data-table'
import { useProductStore } from '@/store/product.store'
import { getColumns } from './columns'

const MainInventory = () => {

const {products, isLoading, fetchProducts} = useProductStore()

useEffect(() => {
    fetchProducts()
}, [fetchProducts])

if(isLoading){
    return (
        <div>
            <Loader2 className="animate-spin" />
        </div>
    )
}

console.log("products",products)

  return (
    <div>
        <DataTable columns={getColumns()} data={products} />
    </div>
  )
}

export default MainInventory