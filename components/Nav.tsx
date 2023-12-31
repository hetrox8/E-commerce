'use client'

import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { AiFillShopping, AiFillHeart, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { motion, AnimatePresence } from "framer-motion"
import { userCartStore } from "@/store"
import UserOptions from "./UserOptions"
import SearchBar from "./SearchBar";
import Cart from "./Cart"
import logo from '@/public/logo3.svg'
import CallButton from "./CallButton"
import MetaPixel from '../functions/metadata'

const Nav = ({ user }:  {user: UserType}) => {
  const cartStore = userCartStore()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false)

  const menuButtonClick = () => {
    setShowMobileMenu(!showMobileMenu)
  }
  const categoriesButtonClick = () => {
    setShowCategoriesMenu(!showCategoriesMenu)
  }

  return (
    <>
      <nav className="flex fixed justify-between text-gray-600 items-center gap-4 px-10 py-4 md:py-1 font-[castoro] w-full z-20">
        <MetaPixel />
      <button className="md:hidden text-3xl" onClick={menuButtonClick}>
        <AiOutlineMenu></AiOutlineMenu>
      </button>

      <Link href={'/'} className="hidden md:block">
        <Image src={logo} width={80} height={80} alt="logo" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex">
          <li className="mr-6 cursor-pointer whitespace-nowrap text-xl group">
            <Link href={'#category'} role="list">Товары</Link>
            <ul className="hidden absolute pr-[0.8rem] pl-[0.8rem] text-white pt-[0.3rem] pb-[0.3rem] group-hover:flex flex-col gap-1 hidden-category z-40">
              <li><Link href={'/category/kitchens'} className="li-hover">Кухня</Link></li>
              <li><Link href={'/category/chairs'} className="li-hover">Стул</Link></li>
              <li><Link href={'/category/sofas'} className="li-hover">Диван</Link></li>
              <li><Link href={'/category/beds'} className="li-hover">Спальня</Link></li>
            </ul>
          </li>
          <li className="mr-6 cursor-pointer text-xl whitespace-nowrap">
            <Link href={'/about'}>О Компании</Link>
          </li>
          <li className="mr-6 cursor-pointer text-xl whitespace-nowrap sale">
            <Link href={'#discounts'}>Акции</Link>
          </li>
      </ul>
      <SearchBar />
      <CallButton />
      <ul className="flex items-center gap-6">
        {/* Cart */}
        <li onClick={() => cartStore.toggleCart()} className="cursor-pointer text-3xl relative">
          <AiFillShopping />
          <AnimatePresence>
              {cartStore.cart.length > 0 && (
                <motion.span animate={{ scale: 1 }} initial={{ scale: 0 }} className="add-cart-point text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center">
                  {cartStore.cart.length}
                </motion.span>
              )}
          </AnimatePresence>
        </li>
        <AnimatePresence>{cartStore.isOpen && <Cart user={user} />}</AnimatePresence>
        {/* Favlist */}
        <li className="cursor-pointer text-3xl">
          <Link href={"/account/wishlist"}><AiFillHeart /></Link>
        </li>
        {/* User Options */}
        {user && (
          <li className="cursor-pointer w-10">
            <UserOptions user={user} />
          </li>
        )}
        {/* Signin Button */}
        {!user && (
            <li className="text-xl">
              <button className="cursor-pointer ml-4" onClick={() => { signIn() }}>Логин</button>
          </li>
        )}
      </ul>
    </nav>

    {/* Mobile Menu */}
    {showMobileMenu && (
        <nav className="fixed top-0 left-0 bottom-45 right-0 text-gray-700 backdrop-blur opacity-90 z-50">
          <button className="absolute right-1 top-2 text-3xl" onClick={menuButtonClick}>
            <AiOutlineClose className=" absolute top-2 right-3"></AiOutlineClose>
        </button>

        <Link href={'/'} className="block">
            <Image src={logo} width={80} height={80} alt="logo" />
        </Link>

          <ul className="flex flex-row text-xl justify-center mb-4 font-castoro ml-4 mt-[1rem]">
            <li className="mr-6 cursor-pointer  whitespace-nowrap" onClick={categoriesButtonClick}>
            <Link href={'#'} onClick={categoriesButtonClick}>Товары</Link>
            {showCategoriesMenu && (
                <ul className="flex text-sm flex-col ml-8">
                  <li><Link href={'/category/kitchens'} className="li-hover">Кухня</Link></li>
                  <li><Link href={'/category/chairs'} className="li-hover">Стул</Link></li>
                  <li><Link href={'/category/sofas'} className="li-hover">Диван</Link></li>
                  <li><Link href={'/category/beds'} className="li-hover mb-4">Спальня</Link></li>
              </ul>
            )}
          </li>
            <li className="mr-6 cursor-pointer whitespace-nowrap">
            <Link href={'/about'}>О Компании</Link>
          </li>
            <li className="mr-6 cursor-pointer whitespace-nowrap">
              <Link href={'#discounts'}>Акции</Link>
          </li>
        </ul>
      </nav>
      )}
    </>
  )
}

export default Nav;
