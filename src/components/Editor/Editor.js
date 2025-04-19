import React, { useState, useCallback, useEffect } from "react";
import "./styles.css";
import uuid from "../../Utilis/uuid";
import { caretToEnd } from "../../Utilis/helpers";
import EditorBlock from "./EditorBlock";

const initialBlock = { id: uuid(), html: "", tag: "p" };

const Editor = () => {
  const [blocks, setBlocks] = useState(() => {
    const saved = localStorage.getItem("editorBlocks");
    return saved ? JSON.parse(saved) : [initialBlock];
  });

  useEffect(() => {
    localStorage.setItem("editorBlocks", JSON.stringify(blocks));
  }, [blocks]);

  const updatePage = useCallback((updatedBlock) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === updatedBlock.id
          ? { ...block, tag: updatedBlock.tag, html: updatedBlock.html }
          : block
      )
    );
  }, []);

  const deleteBlock = useCallback((currBlock) => {
    const prevBlock = currBlock.ref.previousElementSibling;
    if (prevBlock) {
      setBlocks((prev) => {
        const idx = prev.findIndex((block) => block.id === currBlock.id);
        const updatedBlocks = [...prev];
        updatedBlocks.splice(idx, 1);
        return updatedBlocks;
      });
      caretToEnd(prevBlock);
      prevBlock.focus();
    }
  }, []);

  const addBlock = useCallback((currBlock) => {
    const newBlock = { id: uuid(), html: "", tag: "p" };
    setBlocks((prev) => {
      const idx = prev.findIndex((block) => block.id === currBlock.id);
      const updatedBlocks = [...prev];
      updatedBlocks.splice(idx + 1, 0, newBlock);
      return updatedBlocks;
    });
    setTimeout(() => {
      currBlock.ref.nextElementSibling?.focus();
    }, 0);
  }, []);

  const handleDragEnd = useCallback((result) => {
    if (!result.destination) return;
    setBlocks((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(result.source.index, 1);
      updated.splice(result.destination.index, 0, moved);
      return updated;
    });
  }, []);

  return (
    <div className="editor">
      <div className="toolbar">
        <button className="toolbar-button">B</button>
        <button className="toolbar-button">I</button>
        <button className="toolbar-button">U</button>
      </div>
      <div>
        {blocks.map((block, index) => (
          <EditorBlock
            key={block.id}
            id={block.id}
            tag={block.tag}
            html={block.html}
            index={index}
            updatePage={updatePage}
            addBlock={addBlock}
            deleteBlock={deleteBlock}
          />
        ))}
      </div>
    </div>
  );
};

export default Editor;