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
      className="fixed bg-slate-600/[.2] w-full h-full z-10 grid place-items-center px-2 text-slate-600 dark:text-slate-200"
      onClick={closeModalHandler}
    >
      <section className="bg-slate-200 max-w-lg w-full rounded-lg p-5 flex flex-col justify-start dark:bg-slate-900">
        {children}
      </section>
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
