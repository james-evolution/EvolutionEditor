import React, { useRef, useEffect } from 'react';
import './HeadingBlock.css';

export function HeadingBlock({ block, onChange, onFocus, onKeyDown, isFocused, editable = true }) {
  const editorRef = useRef(null);
  const isUpdatingRef = useRef(false);
  const HeadingTag = block.data.htmlTag || 'h1';

  useEffect(() => {
    if (editable && isFocused && editorRef.current) {
      editorRef.current.focus();
    }
  }, [isFocused, editable]);

  useEffect(() => {
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
      <HeadingTag
        className="heading-block"
        style={block.data.styles}
        dangerouslySetInnerHTML={{ __html: block.data.text || '' }}
      />
    );
  }

  return (
    <HeadingTag
      ref={editorRef}
      className="heading-block"
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      onFocus={onFocus}
      onKeyDown={handleKeyDown}
      data-placeholder="Heading"
      style={block.data.styles}
    />
  );
}
