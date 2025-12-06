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
      <DataTable columns={getColumns()} data={brands!} />
    </div>
  )
}

export default MainAllBrands