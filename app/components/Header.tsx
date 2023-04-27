import React from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { AiFillPhone } from "react-icons/ai";

export default function Header() {
  return (
    <header className="bg-gray-900 py-4 shadow-custom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center ">
          <Link href={'/products'}>
            <h3 className="text-white mr-6 cursor-pointer">Products</h3>
          </Link>
          <Link href={'/aboutus'}>
            <h3 className="text-white mr-6 cursor-pointer">About Us</h3>
          </Link>
          <Link href={'/sale'}>
            <h3 className="text-white mr-6 cursor-pointer">Sale</h3>
          </Link>
        </div>
        <SearchBar />
        <Link href={'/feedback'} className="flex items-center text-white">
          <h3 className="mr-4 cursor-pointer">FeedBack</h3>
          <AiFillPhone className="text-white" />
        </Link>
      </div>
    </header>
  )
}
