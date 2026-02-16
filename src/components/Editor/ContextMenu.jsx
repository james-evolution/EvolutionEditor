import React, { useEffect, useRef } from 'react';
import {
  createEmptyBlock,
  createHeadingBlock,
  createListBlock,
  createImageBlock,
  createYouTubeBlock,
  createDividerBlock
} from '../../utils/blockHelpers';
import { HEADING_LEVELS, LIST_STYLES } from '../../utils/constants';

export function ContextMenu({ x, y, onAddBlock, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleInsert = (block) => {
    onAddBlock(block, 'append');
    onClose();
  };

  const items = [
    { label: '¶ Paragraph', action: () => handleInsert(createEmptyBlock()) },
    { label: 'H1', action: () => handleInsert(createHeadingBlock(HEADING_LEVELS.H1)) },
    { label: 'H2', action: () => handleInsert(createHeadingBlock(HEADING_LEVELS.H2)) },
    { label: 'H3', action: () => handleInsert(createHeadingBlock(HEADING_LEVELS.H3)) },
    { label: '• Bullet List', action: () => handleInsert(createListBlock(LIST_STYLES.UNORDERED)) },
    { label: '1. Numbered List', action: () => handleInsert(createListBlock(LIST_STYLES.ORDERED)) },
    { label: 'Image', action: () => handleInsert(createImageBlock()) },
    { label: 'YouTube', action: () => handleInsert(createYouTubeBlock()) },
    { label: '─ Divider', action: () => handleInsert(createDividerBlock()) },
  ];

  return (
    <div ref={menuRef} className="context-menu" style={{ left: x, top: y }}>
      {items.map((item) => (
        <button
          key={item.label}
          className="context-menu-item"
          onClick={item.action}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
