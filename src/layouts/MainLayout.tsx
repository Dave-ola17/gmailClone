import SideNav from "../components/SideNav";
import { useState, useRef, useEffect } from 'react';
import {AiOutlineSearch, AiOutlineQuestionCircle} from 'react-icons/ai'
import {VscSettings} from 'react-icons/vsc'
import {FiSettings} from 'react-icons/fi'
import {CgMenuGridO} from 'react-icons/cg'
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
  Logo?: string;
}

const MainLayout = ({ children, }: MainLayoutProps) => {
    const [search, setSearch] = useState(false);
    // state for the navbar width
    const [navWidth, setNavWidth ] = useState('20%');
    const spanRef = useRef<HTMLSpanElement | null >(null)
    const handleSearchClick = () => {
        setSearch(!search);
    }
    const handleOutsideClick = (event:Event) => {
        if (spanRef.current && !spanRef.current.contains(event.target as Node)) {
            setSearch(false);
        }
    }
    // i used useEffect to remove the click event, after clicking on the searck
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)
        return () =>{
            document.removeEventListener('click', handleOutsideClick)
        }
    })
    const toggleNavWidth = () => {
      setNavWidth(navWidth === '20%' ? '10%' : '20%')
    }
  return (
    <div className="flex h-screen z-10 fixed w-full ">
      <div 
        style={{ width: navWidth, transition: 'width 0.3s ease-in-out' }} //for toggling the width if the nav
        className={`flex flex-col ps-4 bg-[#f2f2f2] `}>        
        <SideNav navWidth={navWidth} toggleNavWidth={toggleNavWidth} />
      </div>
      <div className="flex flex-col flex-1 shadow-lg">
            <div className="flex items-center justify-between bg-[#f2f2f2] py-4 px-5 ">              
                <span ref={spanRef} onClick={handleSearchClick} className={` 
                    ${search ? 'transition-transform transform bg-white  shadow-lg translate-y-1' : ''} 
                    flex items-center gap-2 px-5 py-2 border rounded-[3.5rem]                     
                     `}>
                    <span className=" p-4 rounded-[50%] hover:bg-zinc-300 transition ease-in-out "><AiOutlineSearch  /></span>
                    <span className=" flex">
                      <input className="pr-28 ps-2 outline-none " placeholder="Search..." type="text" />
                      <button className={` ${search ? 'block bg-blue-500 px-2 py-1 rounded-md border-none text-white' : 'hidden'} my-auto`}>Search</button></span>
                    <span className=" p-4 rounded-[50%] hover:bg-zinc-300 transition ease-in-out "><VscSettings /></span>
                </span>
                <div className="flex gap-3">
                    {/* <button className="button px-2 py-1 rounded-md border-gray-100 text-black bg-zinc-300">
                    Sign Up
                    <span className="tooltip">Click Here to signup</span>
                    </button>
                    <button className="px-2 py-1 rounded-md border-gray-100 text-black bg-zinc-300">
                    Login
                    </button> */}
                   <span className=" p-4 rounded-[50%] hover:bg-zinc-300 "> <AiOutlineQuestionCircle /></span>
                    <span  className=" p-4 rounded-[50%] hover:bg-zinc-300 "><FiSettings  /></span>
                    <span  className=" p-4 rounded-[50%] hover:bg-zinc-300 "><CgMenuGridO  /></span>                    
                </div>
            </div>
            <main className=" flex-1 h-screen overflow-y-auto ">
                {children}
            </main>
      </div>
    </div>
  );
};

export default MainLayout;
