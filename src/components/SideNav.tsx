import { Link, useLocation, } from "react-router-dom";
import {useState } from 'react';
import Modal from 'react-modal';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../public/gmailLogo.png'
import {AiOutlineClose, AiOutlineExpandAlt, AiOutlineClockCircle,AiOutlineFile } from 'react-icons/ai'
import {BiPencil, BiSolidInbox, BiStar, BiMenu} from 'react-icons/bi';
import { BsChatLeftText, } from 'react-icons/bs';
import { MdLabelImportantOutline, MdOutlineScheduleSend } from 'react-icons/md';
import { PiTagSimpleDuotone, } from 'react-icons/pi'
import { SlArrowUp, SlArrowDown, } from 'react-icons/sl';
import { RiSpam2Line, RiDeleteBinLine, } from 'react-icons/ri'


  // modal setup for the compose button
  const customModalStyles = (widthSize: boolean) => ({
    content: {
      top: '20', // Adjust as needed
      left: 'auto',
      right: '0',
      bottom: '0', // Adjust as needed
      padding: '0',
      marginRight: '0',
      transform: !widthSize ? 'translateX(-50%) scale(0.8)' : 'none',
      width:  widthSize ? '70%' : '500px', // Adjust the width as needed
      // height: '400px'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      zIndex: 1005,
    }
  });
  
  // const handleWidthSize: () => void;
  interface SideNavProps {
    navWidth: string;
    toggleNavWidth: () => void;
  }
  
  const SideNav: React.FC<SideNavProps> = ({navWidth, toggleNavWidth}) => {
    const location = useLocation();
    // for react-toastify
    const showToast = () => {
      toast.success(` Welcome to the ${location.pathname} page !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error()
    }
    // for the modal
    const [openModal, setOpenModal] = useState(false);
    const [ inputClicked, setInputClicked ] = useState(false);
    const [widthSize, setWidthSize ] = useState(false);
    const [seeMore, setSeeMore] = useState(true);
    const handleOpenModal = () => {
      setOpenModal(true);
    }
    const handleCloseModal = () => {
      setOpenModal(false);
      setInputClicked(false);
    }
    const handleInputClicked = () =>{
      setInputClicked(true);
    } //the handle blur is used to toggle the 'TO & recipient place holder
    const handleInputBlur = () =>{
      setInputClicked(false)
    }    
    const handleWidthSize: () => void = () => {
      setWidthSize(!widthSize);
      console.log("widthSize:", widthSize);
    };
    // for the seemore and less button
    const handleSeeMore = () => {
      setSeeMore(!seeMore)
    }
    
    return (
      <div>
          <nav className={`  flex mt-10 flex-col h-screen z-[999px]`} >
              <div className=" flex gap-3 ">
                <span onClick={() => toggleNavWidth()} className={` cursor-pointer p-1 rounded-full my-auto hover:bg-zinc-300 `}>{navWidth === '10%' ? <AiOutlineClose /> : <BiMenu /> }</span>
                {/* <h3>GMAIL</h3> */}
                <img src={logo} width={50} height={50} alt='Logo Image' />
              </div>
              <div className=" mt-3 ">
                <button 
                  onClick={handleOpenModal}
                  className=" flex items-center my-5 gap-3 bg-[#c2e7ff] p-5 rounded-md transition-transform 
                  transform hover:shadow-lg hover:translate-y-1 ">
                    <BiPencil />
                  {
                    navWidth === '20%' ? 'Compose' : ''
                  }
                </button>
              </div>
              {/* this div is used to set the overflow for all the items of the side nav */}
              <div className={`${seeMore ? 'hover:overflow-y-auto h-[400px]' : 'overflow-hidden'} h-screen`}>
                <ul className=" items-start justify-start list-none flex flex-col gap-2 "> 
                    <li className=" flex gap-2 hover:bg-zinc-300 w-full">                    
                       <Link  
                        onClick={() => showToast()}
                        className={` flex gap-4 ${location.pathname == "/" ? 'bg-zinc-300' : ''} hover:bg-zinc-300  block  px-1 py-1 rounded-md `} 
                        to="/">         
                          <BiSolidInbox className=" my-auto " />               
                         <h6 className={` ${navWidth === '10%' ? 'hidden' : 'block'}`}> Inbox page</h6>
                        </Link>
                    </li>
                    <li className=" flex gap-2 hover:bg-zinc-300 w-full">                        
                        <Link  
                        onClick={() => showToast()}
                        className={` flex gap-4 ${location.pathname == "/Starred" ? 'bg-zinc-300' : ''}   hover:bg-zinc-300 block   px-1 py-1 rounded-md `} 
                        to="/Starred">
                          <BiStar className='my-auto' />
                            <h6 className={`${navWidth === '10%' ? 'hidden' : 'block'}`}>Starred</h6>
                        </Link>
                    </li>
                    <li className=" flex gap-2 hover:bg-zinc-300 w-full">                        
                        <Link  
                        onClick={() => showToast()}
                        className={` flex gap-4 ${location.pathname == "/Snoozed" ? 'bg-zinc-300' : ''}  hover:bg-zinc-300 block  px-1 py-1 rounded-md `} 
                        to="/Snoozed">
                          <AiOutlineClockCircle className='my-auto' />
                            <p className={`${navWidth === '10%' ? 'hidden' : 'block'}`}>Snoozed</p>
                        </Link>
                    </li>                   
                    <li className=" flex gap-2 hover:bg-zinc-300 w-full">                        
                        <Link  
                        onClick={() => showToast()}
                        className={` flex gap-4 ${location.pathname == "/Draft" ? 'bg-zinc-300' : ''}  hover:bg-zinc-300 block  px-1 py-1 rounded-md `} 
                        to="/Draft">
                          <AiOutlineFile className="my-auto" />
                           <h6 className={`${navWidth === '10%' ? 'hidden' : 'block'}`}>Drafts</h6>
                        </Link>
                    </li>
                </ul>
                {/* button to toggle the less and more display on the side nav */}
                <div 
                onClick={handleSeeMore}
                className={` ${seeMore ? 'bg-zinc-300' : ''} mt-2 flex gap-2 hover:bg-zinc-300 items-start justify-start px-1 py-1 rounded-md`}  
                >
                {seeMore ? <SlArrowUp className="my-auto" /> : <SlArrowDown className="my-auto" /> }
                  <button>                
                      {seeMore ? 'See more' : 'Less'}
                    </button>
                </div>
              
                <ul className={` ${seeMore ? 'block h-[70px] transition translate-y-1 ease-in duration-150 ' : 'hidden'} mt-2 items-start justify-start list-none flex flex-col gap-2`}>
                      <li className=" flex gap-2 hover:bg-zinc-300 w-full">
                          
                          <Link  
                          onClick={() => showToast()}
                          className={`flex gap-4 ${location.pathname == "/Important" ? 'bg-zinc-300' : ''} hover:bg-zinc-300 block  px-1 py-1 rounded-md `} 
                          to="/Important">
                            <MdLabelImportantOutline className="my-auto" />
                             <p className={`${navWidth === '10%' ? 'hidden' : 'block'}`}>Important</p>
                          </Link>
                      </li>
                      <li className=" flex gap-2 hover:bg-zinc-300 w-full">                          
                          <Link  
                          onClick={() => showToast()}
                          className={` flex gap-4 ${location.pathname == "/Chart" ? 'bg-zinc-300' : ''} hover:bg-zinc-300 block  px-1 py-1 rounded-md `} 
                          to="/Chart">
                            <BsChatLeftText className="my-auto" />
                            <p className={`${navWidth === '10%' ? 'hidden' : 'block'}`}>Chart</p>
                          </Link>
                      </li>
                      <li className=" flex gap-2 hover:bg-zinc-300 w-full">                          
                          <Link  
                          onClick={() => showToast()}
                          className={`flex gap-4 ${location.pathname == "/Scheduled" ? 'bg-zinc-300' : ''} hover:bg-zinc-300 block  px-1 py-1 rounded-md `} 
                          to="/Scheduled">
                            <MdOutlineScheduleSend className="my-auto" />
                            <p className={`${navWidth === '10%' ? 'hidden' : 'block'}`}>Scheduled</p>
                          </Link>
                      </li>
                      <li className=" flex gap-2 hover:bg-zinc-300 w-full">
                          
                          <Link  
                          onClick={() => showToast()}
                          className={` flex gap-4 ${location.pathname == "/Spam" ? 'bg-zinc-300' : ''} hover:bg-zinc-300 block  px-1 py-1 rounded-md `} 
                          to="/Spam">
                            <RiSpam2Line className="my-auto" />
                            <p className={`${navWidth === '10%' ? 'hidden' : 'block'}`}>Spam</p> 
                          </Link>
                      </li>
                      <li className=" flex gap-2 hover:bg-zinc-300 w-full ">                          
                          <Link  
                          onClick={() => showToast()}
                          className={` flex gap-4 ${location.pathname == "/Bin" ? 'bg-zinc-300' : ''} hover:bg-zinc-300 block  px-1 py-1 rounded-md `} 
                          to="/Bin">
                            <RiDeleteBinLine className="my-auto" />
                            <p className={`${navWidth === '10%' ? 'hidden' : 'block'}`}>Bin</p>
                          </Link>
                      </li>
                      <li className=" flex gap-2 hover:bg-zinc-300 w-full">                          
                          <Link  
                          onClick={() => showToast()}
                          className={` flex gap-4 ${location.pathname == "/Category" ? 'bg-zinc-300' : ''} hover:bg-zinc-300 block  px-1 py-1 rounded-md `} 
                          to="/Category">
                            <PiTagSimpleDuotone className="my-auto" />
                             <p className={`${navWidth === '10%' ? 'hidden' : 'block'}`}>Categories</p>
                          </Link>
                      </li>
                  </ul>                
              </div>           
          </nav>
          {/* code for the modal */}
          <Modal
          isOpen={openModal}
          // onRequestClose={handleCloseModal}
          style={customModalStyles(widthSize)}
          contentLabel="Compose Modal"
          onRequestClose={handleCloseModal}
          >
             <div className=" w-full gap-y-10">
              <div className=" bg-[#f2f2f2]  flex justify-between ">
                <h2 className=" py-2 px-1 font-bold ">New message</h2>
                {/* icons for the Close modal */}
                <div className=" flex gap-1 my-auto py-1 ">
                  <span className=" hover:bg-zinc-400 " onClick={handleWidthSize} ><AiOutlineExpandAlt /></span>
                  <span className=" hover:bg-zinc-400 " onClick={handleCloseModal}><AiOutlineClose className=" hover:bg-zinc-300 " /></span>
                </div>
              </div>
              <div className="flex border-y border-zinc-300 ">
                <h4 className={` ${ inputClicked ? 'block': 'hidden'} text-slate-400`}>To:</h4>
                <input onBlur={handleInputBlur} onClick={handleInputClicked} 
                className=" ps-2 outline-none " 
                type="text" 
                placeholder={!inputClicked ? 'Recipient' : ''} />
              </div>
              <textarea className=" pt-2 ps-2 te outline-none w-full " rows={20} cols={8} placeholder="Subject"></textarea>
            </div>
          </Modal>

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
            {/* Same as */}            
      </div>      
    )
  }

export default SideNav