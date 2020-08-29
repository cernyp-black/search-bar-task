import React from "react";

const DropdownItem = ({ item }) => {
  return (
    <div className="px-3 py-1">
      {item.place_name} – {item.place_type}
    </div>
  );
};

export default DropdownItem;
