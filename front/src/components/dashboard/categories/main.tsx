"use client"

import React, { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { getColumns } from './columns'
import { DataTable } from './data-table'
import { useCategoryStore } from '@/store/category.store'

const MainAllCategories = () => {


const {categories} = useCategoryStore()

 useEffect (() => {
    useCategoryStore.getState().fetchCategories()
 }, [])

 console.log("categories",categories)

  return (
    <div>
      <DataTable columns={getColumns()} data={categories!} />
    </div>
  )
}

export default MainAllCategories