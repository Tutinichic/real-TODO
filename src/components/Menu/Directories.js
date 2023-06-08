import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Arrow from "../../assets/arrow.svg";
import { useAppSelector } from "../../store/hooks";

const Directories = ({ classActive }) => {
  const route = useLocation();
  const currentPath = route.pathname;

  const [isDirectoriesOpen, setIsDirectoriesOpen] = useState(true);
  const directories = useAppSelector((store) => store.tasks.directories);

  const toggleDirectoriesOpen = () => {
    setIsDirectoriesOpen((prevState) => !prevState);
  };

  useEffect(() => {}, []);

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
      {isDirectoriesOpen && (
        <div>
          <ul>
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
          <button className="px-3 py-1 border-slate-300 dark:border-slate-700 border-2 ml-9 mt-2 rounded-md border-dashed hover:text-violet-500">
            + New
          </button>
        </div>
      )}
    </div>
  );
};

export default Directories;
