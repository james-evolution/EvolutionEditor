import React, { useRef, useEffect, useState } from 'react';
import { useEditor } from '../../hooks/useEditor';
import { Toolbar } from '../Toolbar/Toolbar.jsx';
import { ParagraphBlock } from '../Blocks/ParagraphBlock.jsx';
import { HeadingBlock } from '../Blocks/HeadingBlock.jsx';
import { ListBlock } from '../Blocks/ListBlock.jsx';
import { ImageBlock } from '../Blocks/ImageBlock.jsx';
import { YouTubeBlock } from '../Blocks/YouTubeBlock.jsx';
import { DividerBlock } from '../Blocks/DividerBlock.jsx';
import { ContextMenu } from './ContextMenu.jsx';
import { StyleModal } from './StyleModal.jsx';
import { BLOCK_TYPES, LIST_STYLES } from '../../utils/constants';
import './Editor.css';

export function Editor({ initialData, onSave, placeholder = 'Start writing...', editable = true, showBranding = true }) {
  const editorContentRef = useRef(null);
  const blockRefs = useRef({});
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const [editingBlockId, setEditingBlockId] = useState(null);
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  const {
    blocks,
    focusedBlockId,
    setFocusedBlockId,
    addBlock,
    updateBlock,
    updateBlockStyle,
    deleteBlock,
    moveBlock,
    getJSON
  } = useEditor(initialData);

  // Global ESC key handler to deselect
  useEffect(() => {
    if (!editable) return;

    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Escape' && focusedBlockId) {
        setFocusedBlockId(null);
        if (document.activeElement) {
          document.activeElement.blur();
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [focusedBlockId, editable, setFocusedBlockId]);

  const handleSave = () => {
    const json = getJSON();
    if (onSave) {
      onSave(json);
    }
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 1800);
  };

  const handleBlockChange = (blockId, updates) => {
    updateBlock(blockId, updates);
  };

  const handleBlockStyleChange = (styleUpdates) => {
    if (focusedBlockId) {
      updateBlockStyle(focusedBlockId, styleUpdates);
    }
  };

  const handleMoveBlockUp = () => {
    if (!focusedBlockId) return;
    const index = blocks.findIndex(b => b.id === focusedBlockId);
    if (index > 0) {
      moveBlock(index, index - 1);
    }
  };

  const handleMoveBlockDown = () => {
    if (!focusedBlockId) return;
    const index = blocks.findIndex(b => b.id === focusedBlockId);
    if (index < blocks.length - 1) {
      moveBlock(index, index + 1);
    }
  };

  const handleAddBlock = (block, mode = 'append') => {
    if (mode === 'replace' && focusedBlockId) {
      const focusedIndex = blocks.findIndex(b => b.id === focusedBlockId);
      if (focusedIndex !== -1) {
        deleteBlock(focusedBlockId);
        addBlock(block, focusedIndex);
        setTimeout(() => setFocusedBlockId(block.id), 0);
        return;
      }
    }

    addBlock(block, blocks.length);
    setTimeout(() => setFocusedBlockId(block.id), 0);
  };

  const handleContextMenu = (e) => {
    if (!editable) return;
    e.preventDefault();
    const rect = editorContentRef.current.getBoundingClientRect();
    setContextMenu({
      visible: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseDown = (e) => {
    if (!editable) return;

    let clickedBlockId = null;

    for (let blockId in blockRefs.current) {
      const blockEl = blockRefs.current[blockId];
      if (blockEl && blockEl.contains(e.target)) {
        clickedBlockId = blockId;
        break;
      }
    }

    if (clickedBlockId) {
      setFocusedBlockId(clickedBlockId);
    } else {
      setFocusedBlockId(null);
    }
  };

  const handleKeyDown = (blockId, e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setFocusedBlockId(null);
      if (document.activeElement) {
        document.activeElement.blur();
      }
      return;
    }

    const blockIndex = blocks.findIndex(b => b.id === blockId);
    const block = blocks[blockIndex];

    if (e.key === 'Backspace' && block.data.text === '') {
      e.preventDefault();
      deleteBlock(blockId);

      if (blockIndex > 0) {
        setFocusedBlockId(blocks[blockIndex - 1].id);
      }
    }
  };

  const renderBlock = (block) => {
    const isFocused = editable && block.id === focusedBlockId;
    const commonProps = {
      block,
      onChange: (updates) => handleBlockChange(block.id, updates),
      onFocus: () => {},
      isFocused,
      editable,
      placeholder
    };

    switch (block.type) {
      case BLOCK_TYPES.PARAGRAPH:
        return (
          <ParagraphBlock
            {...commonProps}
            onKeyDown={editable ? (e) => handleKeyDown(block.id, e) : undefined}
          />
        );
      case BLOCK_TYPES.HEADING:
        return (
          <HeadingBlock
            {...commonProps}
            onKeyDown={editable ? (e) => handleKeyDown(block.id, e) : undefined}
          />
        );
      case BLOCK_TYPES.LIST:
        return <ListBlock {...commonProps} />;
      case BLOCK_TYPES.IMAGE:
        return <ImageBlock {...commonProps} />;
      case BLOCK_TYPES.YOUTUBE:
        return <YouTubeBlock {...commonProps} />;
      case BLOCK_TYPES.DIVIDER:
        return <DividerBlock {...commonProps} />;
      default:
        return null;
    }
  };

  const getBlockTagLabel = (block) => {
    switch (block.type) {
      case BLOCK_TYPES.PARAGRAPH: return 'p';
      case BLOCK_TYPES.HEADING: return block.data.htmlTag || 'h1';
      case BLOCK_TYPES.LIST: return block.data.style === LIST_STYLES.ORDERED ? 'ol' : 'ul';
      case BLOCK_TYPES.IMAGE: return 'img';
      case BLOCK_TYPES.YOUTUBE: return 'iframe';
      case BLOCK_TYPES.DIVIDER: return 'hr';
      default: return 'div';
    }
  };

  const focusedBlock = blocks.find(b => b.id === focusedBlockId);

  return (
    <div className={`evolution-editor ${!editable ? 'read-only' : ''}`}>
      {editable && (
        <>
          {showBranding && (
            <div className="editor-branding">
              <div className="editor-logo">Evolution Editor</div>
              <div className="editor-subtitle">
                Developed by <a href="https://github.com/james-evolution" target="_blank" rel="noopener noreferrer">@james-evolution</a>
              </div>
              {showSaveNotification && (
                <div className="editor-save-notification">JSON exported successfully</div>
              )}
            </div>
          )}
          {!showBranding && showSaveNotification && (
            <div className="editor-save-notification editor-save-notification-no-brand">JSON exported successfully</div>
          )}
          <div className="editor-stepper">
            <div className="step">
              <span className="step-label">Add Element</span>
              <span className="step-desc">Right-click anywhere to open the menu for inserting elements.</span>
            </div>
            <div className="step">
              <span className="step-label">Style Element</span>
              <span className="step-desc">Click the element to unlock toolbar styling options, or hover over the element and click ✏️ to style.</span>
            </div>
            <div className="step">
              <span className="step-label">Reorder Element</span>
              <span className="step-desc">Use ↑ ↓ on the toolbar or hover an element and click ↕️ to reorder.</span>
            </div>
            <div className="step">
              <span className="step-label">Delete Element</span>
              <span className="step-desc">Hover over an element and click 🗑️ to delete it.</span>
            </div>
          </div>
          <Toolbar
            focusedBlock={focusedBlock}
            onUpdateBlockStyle={handleBlockStyleChange}
            onMoveBlockUp={handleMoveBlockUp}
            onMoveBlockDown={handleMoveBlockDown}
            onSave={handleSave}
          />
        </>
      )}
      <div
        ref={editorContentRef}
        className="editor-content"
        onMouseDown={handleMouseDown}
        onContextMenu={editable ? handleContextMenu : undefined}
      >
        {blocks.map((block, idx) => (
          <div
            key={block.id}
            className="editor-block-wrapper"
          >
            <span className="block-tag-label">&lt;{getBlockTagLabel(block)}&gt;</span>
            <div className="block-left-controls">
              {editable && (
                <div className="block-move-controls">
                  <button
                    className="block-move-btn"
                    onClick={() => idx > 0 && moveBlock(idx, idx - 1)}
                    title="Move up"
                    disabled={idx === 0}
                  >
                    ↑
                  </button>
                  <button
                    className="block-move-btn"
                    onClick={() => idx < blocks.length - 1 && moveBlock(idx, idx + 1)}
                    title="Move down"
                    disabled={idx === blocks.length - 1}
                  >
                    ↓
                  </button>
                </div>
              )}
            </div>
            <div
              ref={editable ? (el) => blockRefs.current[block.id] = el : undefined}
              className={`editor-block ${editable && block.id === focusedBlockId ? 'focused' : ''}`}
              data-block-id={block.id}
            >
              {renderBlock(block)}
            </div>
            {editable && (
              <div className="block-actions">
                <button
                  className="block-edit-button"
                  onClick={() => setEditingBlockId(block.id)}
                  title="Edit block style"
                >
                  ✏️
                </button>
                <button
                  className="block-delete-button"
                  onClick={() => deleteBlock(block.id)}
                  title="Delete block"
                >
                  🗑️
                </button>
              </div>
            )}
          </div>
        ))}
        {editable && contextMenu.visible && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onAddBlock={handleAddBlock}
            onClose={() => setContextMenu({ visible: false, x: 0, y: 0 })}
          />
        )}
      </div>
      {editable && editingBlockId && (
        <StyleModal
          block={blocks.find(b => b.id === editingBlockId)}
          onUpdateStyle={(blockId, styleUpdates) => updateBlockStyle(blockId, styleUpdates)}
          onClose={() => setEditingBlockId(null)}
        />
      )}
    </div>
  );
}
