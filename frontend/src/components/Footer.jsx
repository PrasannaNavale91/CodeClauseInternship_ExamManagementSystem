import React from 'react'
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="bg-[#01b0f8] flex container justify-between items-center py-6 px-28">
      <div className='flex gap-5'>&copy; All Rights Reserved By Jackiiee.</div>
      <div className='flex gap-5'>
        <Link to={""} className='text-xl hover:text-[#2d5649] hover:scale-125 duration-300 transition-all' target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={""} className='text-xl hover:text-[#2d5649] hover:scale-125 duration-300 transition-all' target="_blank">
          <FaYoutube />
        </Link>
        <Link to={""} className='text-xl hover:text-[#2d5649] hover:scale-125 duration-300 transition-all' target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={""} className='text-xl hover:text-[#2d5649] hover:scale-125 duration-300 transition-all' target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </div>
  )
}

export default Footer