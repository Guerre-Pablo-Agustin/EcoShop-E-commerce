import ShoppingCart from '@/components/shoppingCart/ShoppingCart'
import { routes } from '@/lib/routes'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const ShoppingCartPage = () => {
  return (
    <section className='container mx-auto px-4 max-w-7xl'>
     {/* Back Button */}
        <Link
          to={routes.store}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mt-5"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al a tienda
        </Link>
      <ShoppingCart />
    </section>
  )
}

export default ShoppingCartPage