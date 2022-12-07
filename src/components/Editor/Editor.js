import React, { useState } from "react";
import "./styles.css";
import uuid from "../../Utilis/uuid";
import { caretToEnd } from "../../Utilis/helpers";
import EditorBlock from "./EditorBlock";

const initialBlock = { id: uuid(), html: "", tag: "p" };

const Editor = () => {
  const [blocks, setBlocks] = useState([initialBlock]);
  const updatePage = (updatedBlock) => {
    const idx = blocks.map((block) => block.id).indexOf(updatedBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks[idx] = {
      ...updatedBlocks[idx],
      tag: updatedBlock.tag,
      html: updatedBlock.html
    };
    setBlocks(updatedBlocks);
  };

  const deleteBlock = (currBlock) => {
    const prevBlock = currBlock.ref.previousElementSibling;
    if (prevBlock) {
      const idx = blocks.map((block) => block.id).indexOf(currBlock.id);
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(idx, 1);
      setBlocks(updatedBlocks, () => {
        caretToEnd(prevBlock);
        prevBlock.focus();
      });
    }
  };

  const addBlock = (currBlock) => {
    const newBlock = { id: uuid(), html: "", tag: "p" };
    const idx = blocks.map((block) => block.id).indexOf(currBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(idx + 1, 0, newBlock);
    setBlocks(updatedBlocks, () => {
      currBlock.ref.nextElementSibling.focus();
    });
  };

  return (
    <div className="editor">
      {blocks.map((block) => {
        return (
          <EditorBlock
            key={block.id}
            id={block.id}
            tag={block.tag}
            html={block.html}
            updatePage={updatePage}
            addBlock={addBlock}
            deleteBlock={deleteBlock}
          />
        );
      })}
    </div>
  );
};

export default Editor;
