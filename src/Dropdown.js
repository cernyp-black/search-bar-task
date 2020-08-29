import React from "react";
import DropdownItem from "./DropdownItem";

const Dropdown = ({ results }) => {
  return (
    <div className="shadow-lg py-1">
      {results.map((item, i) => (
        <DropdownItem item={item} key={i} />
      ))}
    </div>
  );
};

export default Dropdown;
