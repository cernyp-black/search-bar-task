import React from "react";

const DropdownItem = ({ item, selected }) => {
  const selectedStyle = selected ? " bg-teal-200" : "";

  return (
    <div className={"px-3 py-1" + selectedStyle}>
      {item.place_name} – {item.place_type}
    </div>
  );
};

export default DropdownItem;
