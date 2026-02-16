import { BLOCK_TYPES, DEFAULT_STYLES, HEADING_LEVELS, LIST_STYLES } from './constants';

/**
 * Generate a unique block ID
 */
export function generateId() {
  return `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create an empty paragraph block with instructions
 */
export function createEmptyBlock() {
  return createBlock(BLOCK_TYPES.PARAGRAPH, {
    text: '',
    htmlTag: 'p',
    styles: { ...DEFAULT_STYLES.paragraph }
  });
}

/**
 * Create a new block with given type and data
 */
export function createBlock(type, data) {
  return {
    id: generateId(),
    type,
    data
  };
}

/**
 * Create a heading block
 */
export function createHeadingBlock(level = HEADING_LEVELS.H1, text = '') {
  return createBlock(BLOCK_TYPES.HEADING, {
    level,
    text,
    htmlTag: `h${level}`,
    styles: { ...DEFAULT_STYLES.heading[level] }
  });
}

/**
 * Create a list block
 */
export function createListBlock(style = LIST_STYLES.UNORDERED, items = ['']) {
  return createBlock(BLOCK_TYPES.LIST, {
    style,
    items,
    htmlTag: style === LIST_STYLES.UNORDERED ? 'ul' : 'ol',
    styles: { ...DEFAULT_STYLES.list }
  });
}

/**
 * Create an image block
 */
export function createImageBlock(url = '', alt = '') {
  return createBlock(BLOCK_TYPES.IMAGE, {
    url,
    alt,
    htmlTag: 'img',
    styles: { ...DEFAULT_STYLES.image }
  });
}

/**
 * Create a YouTube block
 */
export function createYouTubeBlock(url = '') {
  const videoId = extractYouTubeId(url);
  return createBlock(BLOCK_TYPES.YOUTUBE, {
    url,
    videoId,
    htmlTag: 'iframe',
    styles: { ...DEFAULT_STYLES.youtube }
  });
}

/**
 * Create a divider block
 */
export function createDividerBlock() {
  return createBlock(BLOCK_TYPES.DIVIDER, {
    htmlTag: 'hr',
    styles: { ...DEFAULT_STYLES.divider }
  });
}

/**
 * Extract YouTube video ID from URL
 */
export function extractYouTubeId(url) {
  if (!url) return '';
  
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : '';
}

/**
 * Update block styles
 */
export function updateBlockStyles(block, styleUpdates) {
  return {
    ...block,
    data: {
      ...block.data,
      styles: {
        ...block.data.styles,
        ...styleUpdates
      }
    }
  };
}

/**
 * Update block data
 */
export function updateBlockData(block, dataUpdates) {
  return {
    ...block,
    data: {
      ...block.data,
      ...dataUpdates
    }
  };
}