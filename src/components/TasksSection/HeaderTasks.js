import React, { useRef } from "react";
import IconBell from "../../assets/bell.svg";
import MenuIcon from "../../assets/menu.svg";
import Tooltip from "../Utilities/Tooltip";
import SearchField from "./SearchField";
import useVisibility from "../hooks/useVisibility";

const classHasNotification =
  "after:content-[''] after:w-2 after:h-2 after:bg-rose-500 block after:rounded-full after:absolute after:bottom-3/4  after:left-3/4";

  const HeaderTasks = () => {
    const refBtnNotification = useRef(null);
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

      const {
    elementIsVisible: notificationIsVisible,
    showElement: showNotifications,
  } = useVisibility([refBtnNotification.current]);

  return (
      <header className="flex items-center">
        <button className="mr-6">
        <img src={MenuIcon} alt=""/>
      </button>
      <SearchField />
      <time dateTime={dateTimeFormat} className="flex-1 text-center">
        {todayDate}
      </time>
      <div className="flex flex-1">
        <div className="mr-6 ml-auto grid place-items-center relative">
          <Tooltip txt="see notifications">
            <button
              ref={refBtnNotification}
              onClick={showNotifications}
              className={`relative ${classHasNotification}`}
            >
              <img src={IconBell} alt="" className="fill-violet-600 w-6 h-6" />
            </button>
          </Tooltip>
          {notificationIsVisible && (
            <ul className="absolute bg-slate-100 dark:bg-slate-800 top-full rounded-md right-0 p-3 w-max">
              <li>my notification 1</li>
              <li>my notification 2</li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderTasks;
