import React from "react";
import MenuIcon from "../../assets/menu.svg";
import SearchField from "./SearchField";
import { useAppDispatch } from "../../store/hooks";
import { menusActions } from "../../store/Menu.store";
import Notification from "./Notification";

const HeaderTasks = () => {
  const dispatch = useAppDispatch();

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const todayDate = `${year}, ${monthName[month].slice(0, 3)} ${day
    .toString()
    .padStart(2, "0")}`;

  const dateTimeFormat = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  const openMenuHeaderHandler = () => {
    dispatch(menusActions.openMenuHeader());
  };


  return (
    <header className="items-center grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-0 md:flex ">
      <button
        className="mr-6 block xl:hidden"
        onClick={openMenuHeaderHandler}
        title="open menu"
      >
        <img src={MenuIcon} alt="" />
      </button>
      <SearchField />
      <div className="text-center">
        <span className="text-slate-600 dark:text-slate-200 uppercase font-bold text-sm block xl:hidden">
          TODO list
        </span>
        <time dateTime={dateTimeFormat}>{todayDate}</time>
      </div>
      <div className="flex flex-1">
        <Notification />
      </div>
    </header>
  );
};

export default HeaderTasks;
