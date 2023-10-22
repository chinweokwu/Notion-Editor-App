import React, { useState, useEffect, useCallback } from "react";
import { matchSorter } from "match-sorter";
import { RxText } from 'react-icons/rx';

const MENU_HEIGHT = -25;
const allowedTags = [
  {
    id: "page-title",
    tag: "h1",
    label: "Page Title"
  },
  {
    id: "heading",
    tag: "h2",
    label: "Heading"
  },
  {
    id: "subheading",
    tag: "h3",
    label: "Subheading"
  },
  {
    id: "paragraph",
    tag: "p",
    label: "Paragraph"
  },
  {
    id: "italic",
    tag: "i",
    label: "Italic"
  }
];

function ContextMenu(props) {
  const [command, setCommand] = useState("");
  const [items, setItems] = useState(allowedTags);
  const [selectedItem, setSelectedItem] = useState(0);

  const keyDownHandler = useCallback((e) => {
    const selected = selectedItem;
    const currentCommand = command;

    switch (e.key) {
      case "Enter":
        e.preventDefault();
        props.onSelect(items[selected].tag);
        break;
      case "Backspace":
        if (!currentCommand) props.close();
        setCommand(currentCommand.substring(0, currentCommand.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        const prevSelected = selected === 0 ? items.length - 1 : selected - 1;
        setSelectedItem(prevSelected);
        break;
      case "ArrowDown":
      case "Tab":
        e.preventDefault();
        const nextSelected = selected === items.length - 1 ? 0 : selected + 1;
        setSelectedItem(nextSelected);
        break;
      default:
        setCommand(currentCommand + e.key);
        break;
    }
  }, [command, selectedItem, items, props]);

  useEffect(() => {
    const filteredItems = matchSorter(allowedTags, command, { keys: ["tag"] });
    setItems(filteredItems);
  }, [command]);

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);

  const x = props.position.x;
  const y = props.position.y - MENU_HEIGHT;
  const positionAttributes = { top: y, left: x };

  return (
    <div className="context-menu" style={positionAttributes}>
      <div className="menu">
        <p className="contextmenu-add">Add Block</p>
        <p className="contextmenu-filter">Keep typing to filter, or escaping to exit </p>
        <p className="contextmenu-keyword">Filtering keyword </p>
        {items.map((item, key) => {
          const isSelected = key === selectedItem;
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
                  <RxText style={{ fontSize: '38px', color: 'grey', paddingRight: '10px' }} />
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
}

export default ContextMenu;
