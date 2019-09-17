import React from "react";

const listGroup = props => {
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedItem
  } = props;
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          style={{ cursor: "pointer" }}
          key={item[valueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};
listGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};
export default listGroup;
