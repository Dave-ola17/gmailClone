import Modal from 'react-modal'

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any; // Adjust the type based on your data structure
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, data }) => {
    if (!isOpen || !data) return null;
    const overlayStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.5'
    }
  
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}  style={{ overlay: overlayStyle }}>     
        <div className='bottom-1 flex justify-end '>
            <button onClick={onClose} 
                className=" bg-blue-300 text-white rounded-md transition-all 
                duration-75 hover:bg-red-400       
            ">
                Close
            </button>
        </div>
        <div>
            <h2 className='text-black text-underline'>{data.name}</h2>
            <p className=' text-black '>{data.message}</p>
        </div>
      
       
    </Modal>
  );
};

export default CustomModal;
