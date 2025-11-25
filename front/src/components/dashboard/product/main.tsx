"use client"

import React from 'react'
import { Loader2 } from 'lucide-react'
import { getColumns } from './columns'
import { DataTable } from './data-table'
import { products } from '@/data/products'

const MainAllProductos = () => {




  return (
    <div>
      <DataTable columns={getColumns()} data={products!} />
    </div>
  )
}

export default MainAllProductos