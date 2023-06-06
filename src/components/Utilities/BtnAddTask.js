import React from "react";

const BtnAddTask = ({ className }) => {
  return (
    <button
      className={`bg-orange-500 hover:bg-orange-600 py-3 px-6 text-slate-50 rounded-lg w-auto transition ${className}`}
    >
      Add new task
    </button>
  );
};

export default BtnAddTask;
