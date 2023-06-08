import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import Search from "../../assets/search.svg";

const SearchField = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const searchResultsRef = useRef(null);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [matchedTasks, setMatchedTasks] = useState([]);

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => {
      return task.title.toLowerCase().includes(searchInputValue);
    });
    if (searchInputValue.trim().length) {
      setMatchedTasks(filteredTasks);
    } else {
      setMatchedTasks([]);
    }
  }, [searchInputValue, tasks]);

  useEffect(() => {
    const checkClick = (e) => {
      if (!searchResultsRef.current) return;
      if (
        e.target !== searchResultsRef.current &&
        !searchResultsRef.current.contains(e.target)
      ) {
        setSearchInputValue("");
      }
    };

    document.addEventListener("click", checkClick);
    return () => {
      document.removeEventListener("click", checkClick);
    };
  }, []);

  return (
    <form className="flex-1 relative">
      <label htmlFor="search" className="sr-only"></label>
      <input
        type="search"
        id="search"
        placeholder="Search task"
        ref={searchResultsRef}
        value={searchInputValue}
        onChange={({ target }) => setSearchInputValue(target.value)}
        className="inputStyles w-full"
      />
      <img src={Search} alt="" className="absolute w-5 right-4 top-3.5 text-slate-400" />
      {matchedTasks.length > 0 && (
        <ul className="absolute bg-slate-100 rounded-md w-full top-14 p-3 divide-y-2 divide-slate-200 dark:bg-slate-800 dark:divide-slate-700">
          {matchedTasks.map((task) => (
            <li key={task.id} className="py-2">
              <Link
                to="/"
                className="flex justify-between transition hover:text-rose-500 dark:hover:text-slate-200"
              >
                <span>{task.title}</span>{" "}
                <span className="text-slate-400">{task.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchField;
