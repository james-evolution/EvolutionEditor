import { useState, useEffect, useCallback } from 'react';
import { createEmptyBlock, updateBlockData, updateBlockStyles } from '../utils/blockHelpers';
import { deserialize, serialize } from '../utils/serializer';

/**
 * Main hook for managing editor state
 */
export function useEditor(initialData) {
  const [blocks, setBlocks] = useState(() => {
    if (initialData) {
      return deserialize(initialData);
    }
    return [];
  });

  const [focusedBlockId, setFocusedBlockId] = useState(null);

  // Update blocks when initialData changes
  useEffect(() => {
    if (initialData) {
      setBlocks(deserialize(initialData));
    } else {
      setBlocks([]);
    }
  }, [initialData]);

  /**
   * Add a new block at the specified index
   */
  const addBlock = useCallback((block, index) => {
    setBlocks(prev => {
      const newBlocks = [...prev];
      newBlocks.splice(index, 0, block);
      return newBlocks;
    });
  }, []);

  /**
   * Update a block by ID
   */
  const updateBlock = useCallback((blockId, updates) => {
    setBlocks(prev =>
      prev.map(block =>
        block.id === blockId ? updateBlockData(block, updates) : block
      )
    );
  }, []);

  /**
   * Update block styles by ID
   */
  const updateBlockStyle = useCallback((blockId, styleUpdates) => {
    setBlocks(prev =>
      prev.map(block =>
        block.id === blockId ? updateBlockStyles(block, styleUpdates) : block
      )
    );
  }, []);

  /**
   * Delete a block by ID
   */
  const deleteBlock = useCallback((blockId) => {
    setBlocks(prev => {
      const filtered = prev.filter(block => block.id !== blockId);
      return filtered;
    });
  }, []);

  /**
   * Move a block to a new position
   */
  const moveBlock = useCallback((fromIndex, toIndex) => {
    setBlocks(prev => {
      const newBlocks = [...prev];
      const [movedBlock] = newBlocks.splice(fromIndex, 1);
      newBlocks.splice(toIndex, 0, movedBlock);
      return newBlocks;
    });
  }, []);

  /**
   * Get the current editor data as JSON
   */
  const getJSON = useCallback(() => {
    return serialize(blocks);
  }, [blocks]);

  /**
   * Clear all blocks
   */
  const clear = useCallback(() => {
    setBlocks([createEmptyBlock()]);
  }, []);

  return {
    blocks,
    focusedBlockId,
    setFocusedBlockId,
    addBlock,
    updateBlock,
    updateBlockStyle,
    deleteBlock,
    moveBlock,
    getJSON,
    clear
  };
}