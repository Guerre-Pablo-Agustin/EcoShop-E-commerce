"use client"

import React, { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { getColumns } from './columns'
import { DataTable } from './data-table'
import { useProductStore } from '@/store/product.store'

const MainAllProductos = () => {

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
        <h1 className="text-2xl font-bold mb-4 text-center">Lista de Productos</h1>
        <DataTable columns={getColumns()} data={products} />
    </div>
  )
}

export default MainAllProductos