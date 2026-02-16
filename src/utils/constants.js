export const PADDING_OPTIONS = [
  '0px', '4px', '8px', '12px', '16px', '24px', '32px', '40px', '48px', '64px'
];

export const MARGIN_OPTIONS = [
  '0px', '4px', '8px', '12px', '16px', '24px', '32px', '40px', '48px', '64px'
];
/**
 * Block type identifiers used throughout the editor.
 * Each type corresponds to a React block component.
 */
export const BLOCK_TYPES = {
  PARAGRAPH: 'paragraph',   // Standard text block
  HEADING: 'heading',       // Heading block (h1, h2, h3)
  LIST: 'list',             // Ordered or unordered list
  IMAGE: 'image',           // Image block
  YOUTUBE: 'youtube',       // Embedded YouTube video
  DIVIDER: 'divider'        // Horizontal divider
};

/**
 * Supported heading levels for heading blocks.
 */
export const HEADING_LEVELS = {
  H1: 1,
  H2: 2,
  H3: 3
};

/**
 * List style options for list blocks.
 */
export const LIST_STYLES = {
  UNORDERED: 'unordered', // Bulleted list
  ORDERED: 'ordered'      // Numbered list
};

/**
 * Default style objects for each block type.
 * These are used as the initial styles for new blocks.
 */
export const DEFAULT_STYLES = {
  heading: {
    1: {
      fontSize: '32px',
      marginTop: '0px',
      marginBottom: '16px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
      color: '#000000'
    },
    2: {
      fontSize: '24px',
      marginTop: '0px',
      marginBottom: '14px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
      color: '#000000'
    },
    3: {
      fontSize: '20px',
      marginTop: '0px',
      marginBottom: '12px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
      color: '#000000'
    }
  },
  paragraph: {
    fontSize: '16px',
    marginTop: '0px',
    marginBottom: '12px',
    marginLeft: '0px',
    marginRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingLeft: '0px',
    paddingRight: '0px',
    color: '#333333'
  },
  list: {
    fontSize: '16px',
    marginTop: '0px',
    marginBottom: '12px',
    marginLeft: '0px',
    marginRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingLeft: '40px',
    paddingRight: '0px',
    color: '#333333'
  },
  image: {
    marginTop: '16px',
    marginBottom: '16px',
    marginLeft: '0px',
    marginRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingLeft: '0px',
    paddingRight: '0px'
  },
  youtube: {
    marginTop: '16px',
    marginBottom: '16px',
    marginLeft: '0px',
    marginRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingLeft: '0px',
    paddingRight: '0px'
  },
  divider: {
    marginTop: '24px',
    marginBottom: '24px',
    marginLeft: '0px',
    marginRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    paddingLeft: '0px',
    paddingRight: '0px'
  }
};

/**
 * Font size options for the toolbar font size picker.
 */
export const FONT_SIZE_OPTIONS = [
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '24px',
  '28px',
  '32px',
  '36px',
  '48px'
];

/**
 * Color options for the toolbar color pickers (text, border, background).
 */
export const COLOR_OPTIONS = [
  '#000000',
  '#333333',
  '#666666',
  '#999999',
  '#CCCCCC',
  '#FFFFFF',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#00FFFF',
  '#FFA500',
  '#800080',
  '#008000'
];
