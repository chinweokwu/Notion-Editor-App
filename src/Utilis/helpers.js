export const caretCoordinates = () => {
  let x, y;
  const option = typeof window.getSelection !== "undefined";
  if (option) {
    const chosen = window.getSelection();
    if (chosen.rangeCount !== 0) {
      const range = chosen.getRangeAt(0).cloneRange();
      range.collapse(false);
      const rects = range.getClientRects()[0];
      if (rects) {
        x = rects.left;
        y = rects.top;
      }
    }
  }
  return { x, y };
};

export const caretToEnd = (e) => {
  const range = document.createRange();
  const chosen = window.getSelection();
  range.selectNodeContents(e);
  range.collapse(false);
  chosen.removeAllRanges();
  chosen.addRange(range);
  e.focus();
};
