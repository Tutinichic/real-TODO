import React from "react";
import IconBell from "../../assets/bell.svg";
import Tooltip from "../Utilities/Tooltip";
import SearchField from "./SearchField";

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
      <SearchField />
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
