import React, { useState, useRef, useEffect } from 'react';
import './ListBlock.css';

export function ListBlock({ block, onChange, onFocus, editable = true }) {
  const [editingIndex, setEditingIndex] = useState(null);
    // Focus the first item when block is focused/created
    useEffect(() => {
      if (!editable) return;
      if (typeof onFocus === 'function' && editingIndex === null) {
        // Wait for block to be focused by parent
        setTimeout(() => {
          if (listRef.current) {
            const first = listRef.current.querySelector('.list-item-content[data-idx="0"]');
            if (first) {
              first.focus();
              setEditingIndex(0);
            }
          }
        }, 0);
      }
    }, [editable, onFocus, editingIndex]);
  const ListTag = block.data.htmlTag || 'ul';
  const listRef = useRef(null);

  const handleItemChange = (index, value, el) => {
    // Save caret position
    let caretOffset = 0;
    if (el && el.isContentEditable) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(el);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
      }
    }
    const newItems = [...block.data.items];
    newItems[index] = value;
    onChange({ items: newItems });
    // Restore caret position
    if (el && el.isContentEditable) {
      setTimeout(() => {
        let node = el;
        let charIndex = 0, found = false, sel = window.getSelection();
        function setCaret(node) {
          if (found) return;
          if (node.nodeType === 3) { // text node
            const nextCharIndex = charIndex + node.length;
            if (!found && caretOffset >= charIndex && caretOffset <= nextCharIndex) {
              const range = document.createRange();
              range.setStart(node, caretOffset - charIndex);
              range.collapse(true);
              sel.removeAllRanges();
              sel.addRange(range);
              found = true;
            }
            charIndex = nextCharIndex;
          } else {
            for (let i = 0; i < node.childNodes.length; i++) {
              setCaret(node.childNodes[i]);
              if (found) break;
            }
          }
        }
        setCaret(node);
      }, 0);
    }
  };

  const handleItemKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newItems = [...block.data.items];
      newItems.splice(index + 1, 0, '');
      onChange({ items: newItems });
      setTimeout(() => {
        setEditingIndex(index + 1);
        // Focus the next item, scoped to this ListBlock only
        if (listRef.current) {
          const next = listRef.current.querySelector(
            `.list-item-content[data-idx='${index + 1}']`
          );
          if (next) {
            next.focus();
          }
        }
      }, 0);
    } else if (e.key === 'Backspace' && block.data.items[index] === '') {
      e.preventDefault();
      if (block.data.items.length > 1) {
        const newItems = block.data.items.filter((_, i) => i !== index);
        onChange({ items: newItems });
        setEditingIndex(index > 0 ? index - 1 : 0);
      }
    }
  };

  if (!editable) {
    return (
      <ListTag className="list-block" style={block.data.styles}>
        {block.data.items.map((item, index) => (
          <li key={index} className="list-item">
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ListTag>
    );
  }

  return (
    <ListTag
      className="list-block"
      style={block.data.styles}
      onClick={onFocus}
      ref={listRef}
    >
      {block.data.items.map((item, index) => (
        <li key={index} className="list-item">
          <div
            contentEditable
            suppressContentEditableWarning
            data-idx={index}
            onInput={(e) => handleItemChange(index, e.target.textContent, e.currentTarget)}
            onKeyDown={(e) => handleItemKeyDown(e, index)}
            onFocus={() => setEditingIndex(index)}
            dangerouslySetInnerHTML={{ __html: item }}
            className="list-item-content"
          />
        </li>
      ))}
    </ListTag>
  );
}
