import React, { useState, useEffect } from 'react';
import MainLayout from "../layouts/MainLayout";
import { BiStar, BiSolidInbox } from 'react-icons/bi';
import { BsTag, BsPeople, } from 'react-icons/bs';
import {RiDeleteBinLine, } from 'react-icons/ri';
import { faker } from '@faker-js/faker';
import {  addSeconds, } from 'date-fns';




//  props for fakers.js data
interface Message  {
  name: String,
  message: string,
  activeClass: number,
  isStared: boolean,
  timestamp: Date,
  checked: boolean,
}

const Inbox = () => {
  //for the tab view selection 
  const [activeTab, setActiveTab] = useState(1);
  
  const [openMessage, setOpenMessage ] = useState<boolean>(true);
  // @ts-ignore
  const handleOpenMessage = () => {
    setOpenMessage(!openMessage);
  };

  const handleTabView = (tabNumber: number) => {
    setActiveTab(tabNumber);
  }
  
  //generating fake data with faker.js
 const generateFakeData = (): Message[] => {
  // @ts-ignore
  return Array.from({ length: 100 }, (_, index) => ({
    name: faker.person.fullName(),
    message: faker.lorem.sentence(),
    activeClass: Math.floor(Math.random() * 3) + 1, //for creating the tab view for only 3 tabs
    isStared: false,
    timestamp: new Date(),
    checked: false,
  }))
 };
 //state for managing the generatedFakeData
 // @ts-ignore
 const [ data, setData ] = useState<Message[]>(generateFakeData())

 
  const filteredData = data.filter(item => item.activeClass === activeTab);

  const [starStates, setStarStates] = useState(data.map(() => false));

  const handleStarClick = (index: number) => {
    const updatedStarStates = [...starStates];
    updatedStarStates[index] = !updatedStarStates[index];
    setStarStates(updatedStarStates);
  };
  const [selectMessage, setSelectMessage ] = useState(data.map(() => false))
  const handleSelectMessage = (index: number) =>{
   const updateMessageState = [...selectMessage];
    updateMessageState[index] = !updateMessageState[index];
    setSelectMessage(updateMessageState)
  }
  //for displaying only part of the message
  const truncateMessage = (message: string): React.ReactNode => {
    const words = message.split(' ');
    const cutWords = words.slice(0, 4);
    const shortnedMessage = cutWords.join(' ') + '...'
    return shortnedMessage
  }
  const [recentDate, setRecentDate ] = useState(data.map(() => new Date()));
  const handleRecentDate = () => {
    setRecentDate((prevDate) => 
      prevDate.map((date) => addSeconds(date, 6))
    )
  }
  useEffect(() => {
    const intervalId = setInterval(handleRecentDate, 6000);
    return clearInterval(intervalId)
  }, [])
  const formatRelativeTime = (timestamp: Date) => {
    const now = new Date();
    const diffrenceInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
    //for timein seconds
    if(diffrenceInSeconds < 60) {
      return `${diffrenceInSeconds} second${diffrenceInSeconds !== 1 ? 's' : ''} ago`
    } //for time in munites
    else if(diffrenceInSeconds < 3600) {
      const minutes = Math.floor(diffrenceInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
    } //fortime in hours
    else if(diffrenceInSeconds < 86400) {
      const hours = Math.floor(diffrenceInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`
    } // for time in days
    else if(diffrenceInSeconds < 2592000){
      const days = Math.floor(diffrenceInSeconds / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`
    }else if(diffrenceInSeconds < 77760000) {
      return `${diffrenceInSeconds} month${diffrenceInSeconds !== 1 ? 's' : ''}`
    }
  };

  

  return (
    <MainLayout>
      <div className='h-screen over-y-auto'>
        <div className="grid grid-cols-3">
          {/* Buttons for tabs */}
          <div
            className={`  hover:bg-[#f2f2f2] flex gap-4 col-span-1 py-2 px-4 ${activeTab === 1 ? 'text-blue-700 border-b-4 rounded-md border-blue-700' : 'text-black'}`}
            onClick={() => handleTabView(1)}
          >
            <BiSolidInbox className=" my-auto " />
            <button>              
              Primary
            </button>
          </div>
          <div 
             className={`   hover:bg-[#f2f2f2] flex gap-4 col-span-1 py-2 px-4 ${activeTab === 2 ? 'text-blue-700 rounded-md border-b-4 border-blue-700' : 'text-black'}`}
             onClick={() => handleTabView(2)}
          >
            <BsTag className=" my-auto " />
            <button>
              Promotioms
            </button>
          </div>
          <div 
             className={`   hover:bg-[#f2f2f2] flex gap-4 col-span-1 py-2 px-4 ${activeTab === 3 ? 'text-blue-700 rounded-md border-b-4 border-blue-700' : 'text-black'}`}
             onClick={() => handleTabView(3)}
          >
            <BsPeople className=" my-auto " />
            <button>
              Socials
            </button>
          </div>
          

          {/* Container for displaying the contents of the clicked tab */}
          <div className="col-span-3 space-y-2 h-screen">
            {/* Content for all tabs */}
            {filteredData.map((datas, index) => (
              <div 
                className={` ${selectMessage[index] ? 'bg-blue-200' : 'bg-none'} 
                px-4 grid grid-cols-4 border-y-2 border-slate-3 transition duration-75 
                hover:shadow-lg hover:z-50 hover:cursor-pointer `}
                key={index}>
                <div className="col-span-1 flex gap-2">
                  <input onClick={(e) => {
                    e.stopPropagation()
                    handleSelectMessage(index)}}  
                  type="checkbox" name="Select" />
                  <BiStar
                    className={`my-auto cursor-pointer ${starStates[index] ? 'text-yellow-500' : 'text-gray-500'}`}
                    onClick={(e:any) => {
                      e.stopPropagation(); // Stop the click event propagation
                      handleStarClick(index);
                    }}
                  />
                </div>
                <div className='col-span-1'>
                  <h4>{datas.name}</h4>
                </div>
                <div className='col-span-1'>
                  <h6>{truncateMessage(datas.message)}</h6>
                </div>
                <div className='col-span-1 my-auto '>
                  {
                    selectMessage[index] ? 
                  <span className=' cursor-pointer '><RiDeleteBinLine className="my-auto " /></span> :                    
                    <p className="text-end">{formatRelativeTime(recentDate[index])}</p>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Inbox;
