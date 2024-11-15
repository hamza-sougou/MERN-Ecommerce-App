import { IoIosClose } from "react-icons/io";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute bg-white rounded z-10 text-right">
            <button
              className="text-black font-semibold hover:text-gray-700 focus:outline-none mr-2"
              onClick={onClose}
            >
              <IoIosClose className="text-3xl" />
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
