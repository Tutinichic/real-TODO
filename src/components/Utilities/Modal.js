import React from "react";
import ReactDOM from "react-dom";

const ModalContent = ({ children, onClose }) => {
  const closeModalHandler = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed bg-slate-600/[.2] w-full h-full z-10 grid place-items-center px-2"
      onClick={closeModalHandler}
    >
      {children}
    </div>
  );
};

const modalElement = document.getElementById("modal");

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <ModalContent children={children} onClose={onClose} />,
    modalElement
  );
};

export default Modal;
