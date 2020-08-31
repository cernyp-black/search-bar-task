import React from "react";

const DropdownItem = ({
  item,
  selected,
  handleMouseMove,
  handleMouseOut,
  itemRef,
}) => {
  const selectedStyle = selected ? " bg-gray-300" : "";

  return (
    <div
      className={
        "px-3 leading-extra first:pt-1 last:pb-1 truncate" + selectedStyle
      }
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseOut={(e) => handleMouseOut(e)}
      ref={itemRef}
    >
      {item.place_name} – {item.place_type}
    </div>
  );
};

export default DropdownItem;
