import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const navigateTo = useNavigate();

  const handleLogout = async()=>{
    try{
      const response = await axios.get('https://localhost:3001/api/logout', { withCredentials: true });
      toast.success(response.data.message);
      navigateTo('/login');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  
return (
    <>
      <nav className="bg-[#01b0f8] px-5 ">
        <div className="items-center mx-w-screen-2xl container mx-auto md:px-20 px-4 flex justify-between">
          <div className="w-[120px] h-[120px]">
            <img src="https://i.pinimg.com/originals/e8/d2/47/e8d247e60dcfc222e89d214b350649ed.png" className='w-[100%] h-[100%]'  alt="logo" />
          </div>
          <ul className={!show ? "menu flex lg:flex-row gap-6 items-center" : "show-menu menu"}>
            <li>
              <Link className='text-lg relative hover:text-[#2d5649] transition-all duration-300'
                to={"/"} onClick={() => setShow(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link className='text-lg relative hover:text-[#2d5649] transition-all duration-300'
                to={"/addStudent"} onClick={() => setShow(false)}>
                Add Student
              </Link>
            </li>
            <li>
              <Link className='text-lg relative hover:text-[#2d5649] transition-all duration-300'
                to={"/addStudentGroup"} onClick={() => setShow(false)}>
                Add Students Group
              </Link>
            </li>
            <li>
              <Link className='text-lg relative hover:text-[#2d5649] transition-all duration-300'
                to={"/createExamination"} onClick={() => setShow(false)}>
                Create Examination
              </Link>
            </li>
            <button onClick={handleLogout}
              className='h-fit p-4 bg-transparent text-lg duration-300 cursor-pointer'
            >Logout</button>
          </ul>
          <div className="lg:hidden texl-4xl">
            <GiHamburgerMenu onClick={() => setShow(!show)} />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar