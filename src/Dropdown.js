import React from "react";
import DropdownItem from "./DropdownItem";

const Dropdown = ({
  results,
  selectedItem,
  handleMouseMove,
  handleMouseOut,
  itemRefs,
  dropdownRef,
}) => {
  return (
    <div className="shadow-lg" ref={dropdownRef}>
      {results.map((item, i) => (
        <DropdownItem
          item={item}
          key={i}
          selected={item === selectedItem}
          handleMouseMove={handleMouseMove}
          handleMouseOut={handleMouseOut}
          itemRef={(el) => (itemRefs.current[i] = el)}
        />
      ))}
    </div>
  );
};

export default Dropdown;
