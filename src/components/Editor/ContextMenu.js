import React, { useState, useEffect, useCallback } from "react";
import { matchSorter } from "match-sorter";
import {
  RxText,
  RxQuote,
  RxListBullet,
  RxCode,
  RxDividerHorizontal,
  RxImage,
  RxTable,
  RxCheckbox,
} from "react-icons/rx";
import { BiHeading } from "react-icons/bi";

const allowedTags = [
  { id: "page-title", tag: "h1", label: "Page Title", icon: <BiHeading size={26} /> },
  { id: "heading", tag: "h2", label: "Heading", icon: <BiHeading size={24} /> },
  { id: "subheading", tag: "h3", label: "Subheading", icon: <BiHeading size={20} /> },
  { id: "paragraph", tag: "p", label: "Paragraph", icon: <RxText size={22} /> },
  { id: "blockquote", tag: "blockquote", label: "Blockquote", icon: <RxQuote size={22} /> },
  { id: "unordered-list", tag: "ul", label: "Unordered List", icon: <RxListBullet size={22} /> },
  { id: "ordered-list", tag: "ol", label: "Ordered List", icon: <RxListBullet size={22} /> },
  { id: "todo", tag: "todo", label: "To-Do List", icon: <RxCheckbox size={22} /> },
  { id: "code", tag: "pre", label: "Code Block", icon: <RxCode size={22} /> },
  { id: "divider", tag: "hr", label: "Divider", icon: <RxDividerHorizontal size={22} /> },
  { id: "image", tag: "img", label: "Image", icon: <RxImage size={22} /> },
  { id: "table", tag: "table", label: "Table", icon: <RxTable size={22} /> },
];

const ContextMenu = ({ position, onSelect, close }) => {
  const [command, setCommand] = useState("");
  const [items, setItems] = useState(allowedTags);
  const [selectedItem, setSelectedItem] = useState(0);

  useEffect(() => {
    const filtered = matchSorter(allowedTags, command, { keys: ["label"] });
    setItems(filtered.length ? filtered : allowedTags);
    setSelectedItem(0);
  }, [command]);

  const handleKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          onSelect(items[selectedItem].tag);
          break;
        case "Escape":
          e.preventDefault();
          close();
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedItem((prev) => (prev === 0 ? items.length - 1 : prev - 1));
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedItem((prev) => (prev === items.length - 1 ? 0 : prev + 1));
          break;
        case "Backspace":
          if (!command) close();
          else setCommand((prev) => prev.slice(0, -1));
          break;
        default:
          if (e.key.length === 1) setCommand((prev) => prev + e.key.toLowerCase());
          break;
      }
    },
    [command, items, selectedItem, close, onSelect]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      className="context-menu"
      style={{ top: position.y - 20, left: position.x }}
    >
      <div className="contextmenu-title">Add Block</div>
      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Search blocks..."
        className="contextmenu-input"
        autoFocus
      />
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`contextmenu-item ${index === selectedItem ? "selected" : ""}`}
          onClick={() => onSelect(item.tag)}
        >
          <div className="contextmenu-icon">{item.icon}</div>
          <div>
            <div className="contextmenu-label">{item.label}</div>
            <div className="contextmenu-shortcut">Type /{item.label.toLowerCase()}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;