import React from "react";
import IconView1 from "../../assets/view-1.svg";
import IconView2 from "../../assets/view-2.svg";

const sortValues = [
  { value: "order-added", title: "Order added" },
  { value: "min-date", title: "New" },
  { value: "max-date", title: "Last" },
  { value: "completed-first", title: "Completed first" },
  { value: "uncompleted-first", title: "Uncompleted first" },
];

const ButtonsSort = ({
  isListInView1,
  setIsListInView1,
  sortedBy,
  setSortedBy,
}) => {
  return (
    <div className="flex children-styles">
      <button onClick={() => setIsListInView1(true)}>
        <img src={IconView1} alt="" className={isListInView1 ? "text-violet-600" : ""} />
      </button>
      <button onClick={() => setIsListInView1(false)}>
        <img src={IconView2} alt="" className={!isListInView1 ? "text-violet-600" : ""} />
      </button>
      <select
        className="ml-auto inputStyles"
        value={sortedBy}
        onChange={({ target }) => setSortedBy(target.value)}
      >
        <option value="" disabled>
          Sort by
        </option>
        {sortValues.map((val) => (
          <option
            key={val.value}
            value={val.value}
            className="bg-slate-100 dark:bg-slate-800"
          >
            {val.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ButtonsSort;
