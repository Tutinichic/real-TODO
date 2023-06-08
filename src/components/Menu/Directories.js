import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Arrow from "../../assets/arrow.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { tasksActions } from "../../store/Tasks.store";
import useVisibility from "../hooks/useVisibility";

const Directories = ({ classActive }) => {
    const route = useLocation();
    const currentPath = route.pathname;
  
    const dispatch = useAppDispatch();
  
    const [isDirectoriesOpen, setIsDirectoriesOpen] = useState(true);
    const [errorDirectoryName, setErrorDirectoryName] = useState(false);
    const directories = useAppSelector((store) => store.tasks.directories);
  
    const buttonNewTaskRef = useRef(null);
    const inputRef = useRef(null);
  
    const toggleDirectoriesOpen = () => {
      setIsDirectoriesOpen((prevState) => !prevState);
    };

const creatingANewDirectoryHandler = () => {
    showInputDir();
  };

  const createNewDirectoryHandler = () => {
    const newDirectoryName = inputRef.current.value.trim();

    if (newDirectoryName.length === 0) return;

    const directoryDoesNotExist = directories.every(
      (dir) => dir !== newDirectoryName
    );

    if (directoryDoesNotExist) {
      dispatch(tasksActions.createDirectory(newDirectoryName));
    }

    setErrorDirectoryName(false);
    inputRef.current.value = "";
  };

  const checkDirNameExists = (val) => {
    const directoryDoesNotExist = directories.every((dir) => dir !== val);

    if (directoryDoesNotExist) {
      setErrorDirectoryName(false);
    } else {
      setErrorDirectoryName(true);
    }
  };

  const {
    elementIsVisible: inputDirIsVisible,
    showElement: showInputDir,
  } = useVisibility(
    [inputRef.current, buttonNewTaskRef.current],
    createNewDirectoryHandler
  );

  useEffect(() => {
    if (inputDirIsVisible) {
      inputRef.current.focus();
    }
  }, [inputDirIsVisible]);

  return (
    <div className="py-4">
      <button
        className={`flex items-center w-full mx-4 mb-2 ${
          isDirectoriesOpen ? "dark:text-slate-200" : ""
        }`}
        onClick={toggleDirectoriesOpen}
      >
        <img src={Arrow} alt="" 
            className={`w-3 h-3 mr-2 rotate-90 transition ${
            isDirectoriesOpen ? "rotate-180" : ""
          }`}
        /> 
        Directories
      </button>
      <div className={isDirectoriesOpen ? "visible" : "hidden"}>
        <div className="ml-9 my-2 mr-4 relative">
          <label htmlFor="dir-name" className="sr-only">
            Enter a directory name
          </label>
          <input
            type="text"
            className={` inputStyles w-full ${
              inputDirIsVisible ? "visible" : "hidden"
            }`}
            id="dir-name"
            ref={inputRef}
            onInput={({ currentTarget }) =>
              checkDirNameExists(currentTarget.value)
            }
          />
          {errorDirectoryName && (
            <div className="absolute bg-rose-500 text-slate-200 rounded-md p-2 top-full text-sm w-full font-medium">
              Directory name already exists
            </div>
          )}
        </div>
        <ul className="max-h-36 overflow-auto">
          {directories.map((dir) => (
            <li key={dir}>
              <NavLink
                to={`/${dir}`}
                className={`pr-4 pl-9 py-2 block hover:text-rose-600 dark:hover:text-slate-200 ${
                  currentPath === "/" + dir ? classActive : ""
                }`}
              >
                {dir}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          className="px-3 py-1 border-slate-300 dark:border-slate-700 border-2 ml-9 mt-2 rounded-md border-dashed hover:text-violet-500"
          onClick={creatingANewDirectoryHandler}
          ref={buttonNewTaskRef}
        >
          + New
        </button>
      </div>
    </div>
  );
};

export default Directories;