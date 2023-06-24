import React from 'react';
import { AiFillFacebook, AiFillInstagram, AiFillTwitterSquare, AiFillCarryOut } from 'react-icons/ai';
import { AiOutlineDeliveredProcedure } from 'react-icons/ai';
import { FiPhoneCall, FiMail, FiCalendar, } from 'react-icons/fi';
import Link from 'next/link';
import visa from '@/public/visa.svg'
import master from '@/public/mastercard.svg'
import Image from 'next/image';
import logo from '@/public/logo1.svg'

function Footer() {
  return (
    <footer>
      <div className="text-white flex flex-col md:flex-row justify-evenly font-[castoro] items-center md:items-start py-10">
        <div className="text-white text-center">
          <Image src={logo} width={150} height={100} alt='logo' id='logo' />
          <p className='text-sm mb-3'>Спасибо за ваш выбор и доверие!</p>
        </div>

        <div className="text-white text-center mb-4">
          <h2 className='text-xl md:my-2'>Режим работы call-центра</h2>
          <div className='flex flex-row justify-center gap-3'>
            <FiCalendar className='text-xl' />
            <p className='text-sm'>ежедневно с 11:00 до 00:00</p>
          </div>
          <h2 className='text-xl md:my-2'>Доставка заказов</h2>
          <div className='flex flex-row justify-center gap-3'>
            <FiCalendar className='text-xl' />
            <p className='text-sm'>ежедневно с 09:00 до 23:00</p>
          </div>
        </div>

        <div className="text-white text-center mb-4">
          <h2 className='text-xl md:my-2'>Контактная информация</h2>
          <div className='flex flex-row gap-3'>
            <FiPhoneCall className='text-xl phone-icon' />
            <Link href="tel:+77087179128" className="text-center">
              <span className="text-white md:text-xl">+7 708 717 91 28</span>
            </Link>
          </div>
          <div className='flex flex-row gap-3'>
            <FiMail className='text-xl phone-icon' />
            <p>interior-mebel@proton.me</p>
          </div>
        </div>

        <div className=' text-center'>
          <div>
            <h2 className='text-xl md:my-2'>Платежные системы</h2>
            <div className='flex flex-row justify-evenly'>
              <Image src={visa} alt='ic' />
              <Image src={master} alt='ic' />
            </div>
          </div>
          <h2 className='mb-2'>Мы в соцсетях:</h2>
          <ul className="flex justify-center gap-3">
            <Link href="https://www.facebook.com/profile.php?id=100094086785165"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white text-white rounded-md text-2xl"><AiFillFacebook /></Link>
            <Link href="https://www.instagram.com/interior_mebelkz/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white text-white rounded-md  text-2xl"><AiFillInstagram /></Link>
            <Link href="https://www.twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-text-white text-white rounded-md  text-2xl"><AiFillTwitterSquare /></Link>
          </ul>
        </div>
      </div>

      <div className='max-w-fit mx-auto py-4 font-sans font-bold'>
        <span>Made with <i className='text-red-700 text-lg'>&#9829;</i> by 
          <Link className='text-blue-400 underline mx-1' target="_blank"
            rel="noreferrer" href={'https://github.com/NurkaAmre'}>Nurka</Link> 
          & 
          <Link className='text-blue-400 underline mx-1' target="_blank"
            rel="noreferrer" href={'https://github.com/ouasamine'}>Amine</Link>

        </span>
      </div>
    </footer>
  );
}

export default Footer;
