'use client'

import Image from 'next/image';
import { userCartStore } from '@/store';
import {IoAddCircle, IoRemoveCircle} from 'react-icons/io5';
import basket from '@/public/shopping-cart.png';
import {motion, AnimatePresence} from 'framer-motion'
import Checkout from './Checkout';
import discountPrice from '@/util/discountPrice';

export default function Cart({ user }: { user: UserType }) {
  const cartStore = userCartStore()
  //Total Price
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + (discountPrice(item.price, item.discount) * (item.quantity as any))
  }, 0)

  return (
    <motion.div 
      layout
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      onClick={() => cartStore.toggleCart()} 
      className='fixed w-full h-screen left-0 top-0 bg-black/25 z-40'
    >
      <motion.div 
        layout
        onClick={(e) => e.stopPropagation()} 
        className=' backdrop-blur opacity-85 transition absolute right-0 top-0 w-full h-screen lg:w-2/5 px-6 py-8 overflow-y-scroll'
      >
        {/* Exit Button */}
        {cartStore.onCheckout === 'cart' && (
          <button onClick={() => cartStore.toggleCart()} className='text-xl text-white bg-[#8CCCC1] px-6 mb-4 rounded-full '>Назад</button>)}
        {/* Return to cart button */}
        {cartStore.onCheckout === 'checkout' && (
          <button onClick={() => cartStore.setCheckout('cart')} className='text-xl text-white bg-[#8CCCC1] mb-4 px-6 rounded-full'>Просмотреть корзину</button>)}
        {/* Display cart items */}
        {cartStore.onCheckout === 'cart' && (
          <>
          {cartStore.cart.map((item) => (
            <motion.div layout key={item.id}
              className='flex px-2 py-4 gap-4 bg-base-100 my-4 rounded-lg'>
              <Image className='rounded-md h-24' src={item.imagesURL[0]} alt={item.name} width={120} height={120}/>
              <div>
                <h2>{item.name}</h2>
                {/* Update quantity of a product */}
                <div className='flex gap-2'>
                  <h2>Количество: </h2>
                  <button onClick={() => cartStore.removeProduct(item)}><IoRemoveCircle /></button>
                  <h2>{item.quantity}</h2>
                  <button onClick={() => cartStore.addProduct({...item, quantity: 1})}><IoAddCircle /></button>
                </div>
                <p className='font-semibold text-gray-400 mt-2'>{discountPrice(item.price, item.discount)} <span className='text-teal-400'>KZT</span></p>
              </div>

            </motion.div>
          ))}
          </>
        )}

        {/* Checkout button and total amount */}

        {cartStore.cart.length > 0 && cartStore.onCheckout === 'cart' ? (
        <motion.div layout>
            <p className='font-bold text-white mt-6'>Сумма к оплате: {totalPrice}  <span className='text-teal-400'>KZT</span></p>
          {/* cartStore.setCheckout('checkout') */}
          <button 
            onClick={() => cartStore.setCheckout('checkout')}
            className='py-2 mt-4 btn w-full rounded-full text-white'
          >
            Оформить заказ
          </button> 
        </motion.div>
        ) : null}

        {/* Empty Cart */}
        <AnimatePresence>
          {!cartStore.cart.length && cartStore.onCheckout === 'cart' && (
            <motion.div 
            animate={{scale: 0, rotateZ: 0, opacity: 0.75}}
            initial={{scale: 0.5, rotateZ: -10, opacity: 0}}
            exit={{scale: 0.5, rotateZ: -10, opacity: 0}}
            className='flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75'>
                <h1>Опаа.... Она пуста. </h1>
              <Image src={basket} alt="empty cart" width={200}  height={200}/>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Checkout from */}
        {cartStore.onCheckout === 'checkout' && user && (
          <Checkout user={user} />
        )}
        {/* Checkout form for non signed in users */}
        {cartStore.onCheckout === 'checkout' && !user && (
          <p>You need to sign in to be able to complete an order</p>
        )}
      </motion.div>
    </motion.div>
  )
}
