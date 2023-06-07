import React from "react";
import IconView1 from "../../assets/view-1.svg";
import IconView2 from "../../assets/view-2.svg";

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
        <option value="min-date">New</option>
        <option value="max-date">Last</option>
        <option value="completed-first">Completed first</option>
        <option value="uncompleted-first">Uncompleted first</option>
      </select>
    </div>
  );
};

export default ButtonsSort;
