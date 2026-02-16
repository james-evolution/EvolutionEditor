import { createEmptyBlock } from './blockHelpers';

/**
 * Serialize editor blocks to JSON format
 */
export function serialize(blocks) {
  return {
    version: '1.0.0',
    time: Date.now(),
    blocks: blocks.map(block => ({
      id: block.id,
      type: block.type,
      data: block.data
    }))
  };
}

/**
 * Deserialize JSON to editor blocks
 */
export function deserialize(json) {
  // Handle empty or invalid JSON
  if (!json || !json.blocks || !Array.isArray(json.blocks)) {
    return [createEmptyBlock()];
  }

  // Handle empty blocks array
  if (json.blocks.length === 0) {
    return [createEmptyBlock()];
  }

  // Map JSON blocks to editor blocks
  return json.blocks.map(block => ({
    id: block.id,
    type: block.type,
    data: block.data
  }));
}

/**
 * Validate JSON structure
 */
export function validateJSON(json) {
  try {
    if (!json || typeof json !== 'object') {
      return false;
    }

    if (!json.blocks || !Array.isArray(json.blocks)) {
      return false;
    }

    // Validate each block has required fields
    for (const block of json.blocks) {
      if (!block.id || !block.type || !block.data) {
        return false;
      }
    }

    return true;
  } catch (error) {
    return false;
  }
}
