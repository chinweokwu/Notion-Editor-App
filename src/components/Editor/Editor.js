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
    const selection = window.getSelection();
    const block = currBlock.ref;
    const id = currBlock.id;
  
    if (selection.isCollapsed) {
      const selectionStart = selection.anchorOffset;
  
      if (selectionStart > 0) {
        // Remove the character before the cursor
        const text = block.textContent;
        const newText = text.slice(0, selectionStart - 1) + text.slice(selectionStart);
        block.textContent = newText;
        caretToEnd(block);
      }
  
      if (block.textContent.trim() === "" || block.innerHTML === "") {
        // If the block is empty or innerHTML is empty, you can remove it
        console.log("Block innerHTML is empty. Removing block.");
        const idx = blocks.findIndex((b) => b.id === id);
        if (idx > 0) {
          const updatedBlocks = [...blocks];
          updatedBlocks.splice(idx, 1);
          setBlocks(updatedBlocks);
        }
      }
    } else {
      // If there's a selection, delete the selected content
      selection.deleteFromDocument();
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


  const reorderBlocks = (draggedBlockId, targetBlockId) => {
    // Find the index of the dragged block and the target block
    const draggedBlockIndex = blocks.findIndex((block) => block.id === draggedBlockId);
    const targetBlockIndex = blocks.findIndex((block) => block.id === targetBlockId);
  
    if (draggedBlockIndex === -1 || targetBlockIndex === -1) {
      // Handle invalid block IDs
      return;
    }
  
    // Create a copy of the blocks array
    const updatedBlocks = [...blocks];
  
    // Remove the dragged block from its current position
    const [draggedBlock] = updatedBlocks.splice(draggedBlockIndex, 1);
  
    // Insert the dragged block at the target position
    updatedBlocks.splice(targetBlockIndex, 0, draggedBlock);
  
    // Update the state with the new order of blocks
    setBlocks(updatedBlocks);
  };

  return (
    <div className="editor">
{blocks.map((block, index) => {
  return (
    <EditorBlock
    key={block.id}
    id={block.id}
    tag={block.tag}
    html={block.html}
    updatePage={updatePage}
    addBlock={addBlock}
    deleteBlock={deleteBlock}
    isFirstBlock={index === 0}
    isLastBlock={index === blocks.length - 1}
    blocks={blocks}
    setBlocks={setBlocks}
    recorderBlocks={reorderBlocks}
    />
  );
})}
    </div>
  );
};

export default Editor;