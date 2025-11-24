"use client"

import React from 'react'
import { Loader2 } from 'lucide-react'
import { getColumns } from './columns'
import { DataTable } from './data-table'
import { brands } from '@/data/products'

const MainAllBrands = () => {




  return (
    <div>
      <DataTable columns={getColumns()} data={brands!} />
    </div>
  )
}

export default MainAllBrands