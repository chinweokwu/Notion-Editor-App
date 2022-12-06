import React, { useState, useEffect } from "react";
import { matchSorter } from "match-sorter";

const MENU_HEIGHT = 150;
const allowedTags = [
  {
    id: "page-title",
    tag: "h1",
    label: "Heading"
  },
  {
    id: "paragraph",
    tag: "p",
    label: "Paragraph"
  }
];

const ContextMenu = (props) => {
  const [command, setCommand] = useState("");
  const [items, setitems] = useState(allowedTags);
  const [selectedItem, setSelectdItem] = useState(0);
  const x = props.position.x;
  const y = props.position.y - MENU_HEIGHT;
  const positionAttributes = { top: y, left: x };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    if (command) {
      const items = matchSorter(allowedTags, command, { keys: ["tag"] });
      setitems(items);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [command]);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        props.onSelect(items[selectedItem].tag);
        break;
      case "Backspace":
        if (!command) props.close();
        setCommand(command.substring(0, command.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        const prevSelected =
          selectedItem === 0 ? items.length - 1 : selectedItem - 1;
        setSelectdItem(prevSelected);
        break;
      case "ArrowDown":
      case "Tab":
        e.preventDefault();
        const nextSelected =
          selectedItem === items.length - 1 ? 0 : selectedItem + 1;
        setSelectdItem(nextSelected);
        break;
      default:
        setCommand(command + e.key);
        break;
    }
  };

  return (
    <div className="context-menu" style={positionAttributes}>
      <div className="menu">
        {items.map((item, key) => {
          const isSelected = items.indexOf(item) === selectedItem;
          return (
            <div
              className={isSelected ? "Selected" : null}
              key={key}
              role="button"
              tabIndex="0"
              onClick={() => props.onSelect(item.tag)}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContextMenu;