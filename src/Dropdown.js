import React from "react";
import DropdownItem from "./DropdownItem";

const Dropdown = ({
  results,
  selectedItem,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  return (
    <div className="shadow-lg py-1">
      {results.map((item, i) => (
        <DropdownItem
          item={item}
          key={i}
          selected={item === selectedItem}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};

export default Dropdown;
