import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useAppDispatch } from "../../store/hooks";
import { modalActions } from "../../store/Modal.store";
import { tasksActions } from "../../store/Tasks.store";

const ModalContent = () => {
  const dispatch = useAppDispatch();

  const today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  const year = today.getFullYear();
  if (day < 10) {
    day = +("0" + day);
  }
  if (month < 10) {
    month = +("0" + month);
  }

  const todayDate = year + "-" + month + "-" + day;
  const maxDate = year + 1 + "-" + month + "-" + day;

  const titleInputRef = useRef(null);
  const descriptionTextRef = useRef(null);
  const [date, setDate] = useState(todayDate);
  const isTitleValid = useRef(false);
  const isDateValid = useRef(false);

  const [isImportant, setIsImportant] = useState(false);

  const addNewTaskHandler = (event) => {
    event.preventDefault();

    isTitleValid.current = titleInputRef.current.value.trim().length > 0;
    isDateValid.current = date.trim().length > 0;

    if (isTitleValid.current && isDateValid.current) {
      const newTask = {
        title: titleInputRef.current.value,
        dir: "Home",
        description: descriptionTextRef.current.value,
        date: date,
        completed: false,
        important: isImportant,
        id: Date.now().toString(),
      };
      dispatch(tasksActions.addNewTask(newTask));
      dispatch(modalActions.closeModalHandler());
    }
  };

  const closeModalHandler = (event) => {
    if (event.target === event.currentTarget)
      dispatch(modalActions.closeModalHandler());
  };

  useEffect(() => {
    console.log(isTitleValid.current);
  }, [isTitleValid]);

  return (
    <>
      <div
        className="fixed bg-slate-600/[.2] w-full h-full z-10 grid place-items-center px-2"
        onClick={closeModalHandler}
      >
        <section className=" bg-slate-200 max-w-lg w-full rounded-lg p-5 flex flex-col justify-start">
          <h2 className="font-medium mb-5 text-2xl text-slate-600">
            Add a task
          </h2>
          <form
            className="flex flex-col stylesInputsField"
            onSubmit={addNewTaskHandler}
          >
            <label>
              Title
              <input
                type="text"
                placeholder="e.g, do the homework"
                ref={titleInputRef}
                className="w-full"
              />
            </label>
            <label>
              Date
              <input
                type="date"
                className="w-full"
                value={date}
                onChange={({ target }) => setDate(target.value)}
                min={todayDate}
                max={maxDate}
              />
            </label>
            <label>
              Description (optional)
              <textarea
                placeholder="e.g, do the homework"
                className="w-full"
                ref={descriptionTextRef}
              ></textarea>
            </label>
            <label className="mb-0 flex">
              <span className="order-1 flex-1">Mark as important</span>
              <input
                type="checkbox"
                className="w-4 h-4 basis-4 mr-2"
                checked={isImportant}
                onChange={() => setIsImportant((prev) => !prev)}
              />
            </label>
            <button type="submit" className="btn mt-5">
              Add task
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

const modalElement = document.getElementById("modal");

const Modal = () => {
  return ReactDOM.createPortal(<ModalContent />, modalElement);
};

export default Modal;