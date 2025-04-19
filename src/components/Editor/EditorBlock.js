import React, { useState, useRef, useEffect, useCallback } from "react";
import ContentEditable from "react-contenteditable";
import { caretCoordinates, caretToEnd } from "../../Utilis/helpers";
import ContextMenu from "./ContextMenu";

const CMD_KEY = "/";

const EditorBlock = ({ html: initialHtml, tag: initialTag, id, index, updatePage, addBlock, deleteBlock }) => {
  const [html, setHtml] = useState(initialHtml);
  const [tag, setTag] = useState(initialTag);
  const [previousKey, setPreviousKey] = useState("");
  const [selectMenuIsOpen, setSelectMenuIsOpen] = useState(false);
  const [selectMenuPosition, setSelectMenuPosition] = useState({ x: null, y: null });
  const contentEditable = useRef(null);

  useEffect(() => {
    setHtml(initialHtml);
    setTag(initialTag);
  }, [initialHtml, initialTag]);

  useEffect(() => {
    updatePage({ id, html, tag });
  }, [html, tag, id, updatePage]);

  const applyFormatting = (text) => {
    let formatted = text;
    formatted = formatted.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/_(.*?)_/g, '<em>$1</em>');
    formatted = formatted.replace(/~(.*?)~/g, '<u>$1</u>');
    return formatted;
  };

  const onChangeHandler = useCallback((e) => {
    const rawText = e.target.value.replace(/<[^>]+>/g, "");
    const formattedHtml = applyFormatting(rawText);
    setHtml(formattedHtml);
  }, []);

  const openSelectMenu = useCallback(() => {
    const { x, y } = caretCoordinates();
    setSelectMenuIsOpen(true);
    setSelectMenuPosition({ x, y });
  }, []);

  const closeSelectMenu = useCallback(() => {
    setSelectMenuIsOpen(false);
    setSelectMenuPosition({ x: null, y: null });
  }, []);

  const tagSelectionHandler = useCallback(
    (newTag) => {
      setTag(newTag);
      setHtml((prev) => {
        caretToEnd(contentEditable.current);
        return prev;
      });
      closeSelectMenu();
    },
    [closeSelectMenu]
  );

  const onKeyDownHandler = useCallback(
    (e) => {
      if (e.key === CMD_KEY && !selectMenuIsOpen) {
        e.preventDefault();
        openSelectMenu();
      }

      if (e.key === "Enter" && previousKey !== "Shift" && !selectMenuIsOpen) {
        e.preventDefault();
        addBlock({ id, ref: contentEditable.current });
      }

      if (e.key === "Backspace" && !html.replace(/<[^>]+>/g, "") && !selectMenuIsOpen) {
        e.preventDefault();
        deleteBlock({ id, ref: contentEditable.current });
      }

      if ((tag === "ul" || tag === "ol") && e.key === "Tab" && !e.shiftKey) {
        e.preventDefault();
        setHtml((prev) => `<li style="margin-left: 20px">${prev.replace(/<\/?li>/g, "")}</li>`);
      }

      setPreviousKey(e.key);
    },
    [html, previousKey, selectMenuIsOpen, addBlock, deleteBlock, id, tag, openSelectMenu]
  );

  const renderBlock = () => {
    if (tag === "img") {
      return <div className="image-placeholder">Image Placeholder</div>;
    }
    if (tag === "table") {
      return (
        <table className="table-block">
          <tbody>
            <tr>
              <td className="table-cell">Cell 1</td>
              <td className="table-cell">Cell 2</td>
            </tr>
            <tr>
              <td className="table-cell">Cell 3</td>
              <td className="table-cell">Cell 4</td>
            </tr>
          </tbody>
        </table>
      );
    }
    if (tag === "todo") {
      return (
        <div className="todo-block">
          <input type="checkbox" />
          <ContentEditable
            innerRef={contentEditable}
            html={html}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            className="editor-block todo-content"
          />
        </div>
      );
    }
    return (
      <ContentEditable
        innerRef={contentEditable}
        html={html}
        tagName={tag}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        className={`editor-block ${tag === "pre" ? "code-block" : ""}`}
      />
    );
  };

  return (
    <div className="block-wrapper">
      {selectMenuIsOpen && (
        <ContextMenu
          position={selectMenuPosition}
          onSelect={tagSelectionHandler}
          close={closeSelectMenu}
        />
      )}
      {renderBlock()}
    </div>
  );
};

export default EditorBlock;