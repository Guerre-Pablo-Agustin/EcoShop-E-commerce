"use client"

import React, { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { getColumns } from './columns'
import { DataTable } from './data-table'
import { useCertificationStore } from '@/store/certification.store'

const MainAllCertifications = () => {


const {certifications} = useCertificationStore()

 useEffect (() => {
    useCertificationStore.getState().fetchCertifications()
 }, [])

 console.log("certifications",certifications)

  return (
    <div>
      <DataTable columns={getColumns()} data={certifications!} />
    </div>
  )
}

export default MainAllCertifications