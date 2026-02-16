import React, { useRef, useEffect } from 'react';
import './ParagraphBlock.css';

export function ParagraphBlock({ block, onChange, onFocus, onKeyDown, isFocused, editable = true, placeholder }) {
  const editorRef = useRef(null);
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    if (editable && isFocused && editorRef.current) {
      editorRef.current.focus();
    }
  }, [isFocused, editable]);

  useEffect(() => {
    // Only update if content changed from outside (not from user typing)
    if (editorRef.current && !isUpdatingRef.current) {
      if (editorRef.current.innerHTML !== block.data.text) {
        editorRef.current.innerHTML = block.data.text || '';
      }
    }
    isUpdatingRef.current = false;
  }, [block.data.text]);

  const handleInput = (e) => {
    isUpdatingRef.current = true;
    onChange({
      text: e.target.innerHTML
    });
  };

  const handleKeyDown = (e) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  if (!editable) {
    return (
      <div
        className="paragraph-block"
        style={block.data.styles}
        dangerouslySetInnerHTML={{ __html: block.data.text || '' }}
      />
    );
  }

  return (
    <div
      ref={editorRef}
      className="paragraph-block"
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      onFocus={onFocus}
      onKeyDown={handleKeyDown}
      data-placeholder={placeholder || "Start typing..."}
      style={block.data.styles}
    />
  );
}
