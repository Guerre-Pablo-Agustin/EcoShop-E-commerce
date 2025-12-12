"use client"

import React, { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { getColumns } from './columns'
import { DataTable } from './data-table'
import { useBrandStore } from '@/store/brand.store'

const MainAllBrands = () => {


const {brands} = useBrandStore()

 useEffect (() => {
    useBrandStore.getState().fetchBrands()
 }, [])

 console.log("brands",brands)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Lista de Marcas</h1>
      <DataTable columns={getColumns()} data={brands!} />
    </div>
  )
}

export default MainAllBrands