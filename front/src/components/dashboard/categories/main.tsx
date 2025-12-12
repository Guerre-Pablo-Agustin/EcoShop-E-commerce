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
        <h1 className="text-2xl font-bold mb-4 text-center">Lista de Categorias</h1>
      <DataTable columns={getColumns()} data={categories!} />
    </div>
  )
}

export default MainAllCategories