import React from "react";

const DropdownItem = ({
  item,
  selected,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const selectedStyle = selected ? " bg-teal-200" : "";

  return (
    <div
      className={"px-3 py-1" + selectedStyle}
      onMouseEnter={(e) => handleMouseEnter(e)}
      onMouseLeave={(e) => handleMouseLeave(e)}
    >
      {item.place_name} – {item.place_type}
    </div>
  );
};

export default DropdownItem;
