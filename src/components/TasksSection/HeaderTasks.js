import React from "react";
import Search from "../../assets/search.svg";
import IconBell from "../../assets/bell.svg";
import Tooltip from "../Utilities/Tooltip";

const classHasNotification =
  "after:content-[''] after:w-2 after:h-2 after:bg-rose-500 block after:rounded-full after:absolute after:bottom-3/4  after:left-3/4";

  const HeaderTasks = () => {
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
      .padStart(2, "0")}}`;

  return (
    <header className="flex items-center">
      <form className="flex-1 relative">
        <label htmlFor="search" className="sr-only"></label>
        <input
          type="search"
          id="search"
          placeholder="Search task"
          className="inputStyles w-full"
        />
        <img src={Search} alt="" className="absolute w-5 right-4 top-3.5 text-slate-400" />
      </form>
      <time dateTime={dateTimeFormat} className="flex-1 text-center">
        {todayDate}
      </time>
      <div className="flex flex-1">
        <Tooltip txt="see notifications" className="mr-6 ml-auto">
          <button
            className={`relative ${classHasNotification}`}
            title="notifications"
          >
            <img src={IconBell} alt="" className="fill-violet-600 w-6 h-6" />
          </button>
        </Tooltip>
      </div>
    </header>
  );
};

export default HeaderTasks;
