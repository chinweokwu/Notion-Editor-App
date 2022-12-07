import React, { useState, useEffect, useCallback} from "react";
import { matchSorter } from "match-sorter";
import {RxText} from 'react-icons/rx'

const MENU_HEIGHT = -25;
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

  const handleKeyDown = useCallback((e) => {
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
  },[command]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown());
    const comd = setCommand(command)
    if (command !== comd) {
      const items = matchSorter(allowedTags, command, { keys: ["tag"] });
      setitems(items);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown());
    };
  },[handleKeyDown,command]);

  return (
    <div className="context-menu" style={positionAttributes}>
      <div className="menu">
        <p className="contextmenu-add">Add Block</p>
        <p className="contextmenu-filter">Keep typing to filter, or escaping to exit </p>
        <p className="contextmenu-keyword">Filtering keyword </p>
      
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
              <div className="contextmenu-text">
                <div>
                  <RxText style={{fontSize:'38px', color:'grey', paddingRight:'10px' }}/> 
                </div>
                <div>
                  <p className="contextmenu-item">{item.label}</p>
                  <span className="contextmenu-shortcut">Shortcut: type # + space</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContextMenu;