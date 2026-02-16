
# EvolutionEditor Architecture


## Component Tree

```
┌──────────────────────────────────────────────┐
│           EvolutionEditor (exported)         │
│         (src/components/Editor/Editor.jsx)   │
└────────────────────┬────────────────────────┘
                   │
       ┌────────────┴────────────┐
       │                         │
       ▼                         ▼
┌───────────────┐         ┌──────────────────┐
│   Toolbar     │         │  Editor Content  │
│ (Toolbar.jsx) │         │ (Blocks Rendered │
└───────────────┘         │   Dynamically)   │
                       └──────────────────┘
```


Editor Content dynamically renders:
- ParagraphBlock (paragraph)
- HeadingBlock (heading, H1/H2/H3)
- ListBlock (ordered/unordered, nesting supported)
- ImageBlock (image, with alt text)
- YouTubeBlock (YouTube video embeds, multiple URL formats)
- DividerBlock (horizontal rule)

Other subcomponents:
- ContextMenu (right-click/insert menu)
- StyleModal (block style editing)


## Data Flow

```
┌──────────────┐
│  User Input  │
└──────┬───────┘
       │
       ▼
┌──────────────────────────┐
│   Block Component        │
│   (onChange callback)    │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│   EvolutionEditor        │
│   (handles block change) │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│   useEditor Hook         │
│   (state/actions)        │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│   State Update           │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│   Re-render              │
└──────────────────────────┘
```


## File Dependencies

```
src/index.js (Entry Point)
       │
       ├─── components/Editor/Editor.jsx (EvolutionEditor)
       │       │
       │       ├─── Toolbar/Toolbar.jsx
       │       │       └─── ToolbarButton.jsx
       │       │
       │       ├─── Blocks/
       │       │       ├─── ParagraphBlock.jsx
       │       │       ├─── HeadingBlock.jsx
       │       │       ├─── ListBlock.jsx
       │       │       ├─── ImageBlock.jsx
       │       │       ├─── YouTubeBlock.jsx
       │       │       └─── DividerBlock.jsx
       │       │
       │       ├─── ContextMenu.jsx
       │       └─── StyleModal.jsx
       │
       ├─── hooks/useEditor.js
       │       └─── utils/blockHelpers.js
       │
       ├─── utils/constants.js
       ├─── utils/serializer.js
       └─── (other utils)
```


## State Management

```
┌─────────────────────────────────────────────┐
│            useEditor Hook                   │
├─────────────────────────────────────────────┤
│  State:                                    │
│  • blocks: Block[]                         │
│  • focusedBlockId: string | null           │
│                                            │
│  Actions:                                  │
│  • addBlock(block, index)                  │
│  • updateBlock(id, updates)                │
│  • updateBlockStyle(id, styleUpdates)      │
│  • deleteBlock(id)                         │
│  • moveBlock(fromIndex, toIndex)           │
│  • getJSON()                               │
│  • clear()                                 │
└─────────────────────────────────────────────┘
           │
           │ Returns state and actions
           ▼
┌─────────────────────────────────────────────┐
│         EvolutionEditor Component           │
│                                            │
│  Uses state and actions to:                │
│  • Render blocks                           │
│  • Handle user interactions                │
│  • Coordinate with Toolbar                 │
└─────────────────────────────────────────────┘
```


## Block Structure

```
┌─────────────────────────────────────────────┐
│                  Block                      │
├─────────────────────────────────────────────┤
│  id: string                                 │
│  type: 'paragraph' | 'heading' | 'list' | 'image' | 'youtube' | 'divider' │
│  data: {                                    │
│    text?: string                            │
│    level?: number                           │
│    items?: string[]                         │
│    style?: 'ordered' | 'unordered'          │
│    url?: string                             │
│    alt?: string                             │
│    videoId?: string                         │
│    htmlTag?: string                         │
│    styles: {                                │
│      color?: string                         │
│      fontSize?: string                      │
│      marginTop?: string                     │
│      marginBottom?: string                  │
│      marginLeft?: string                    │
│      marginRight?: string                   │
│      paddingTop?: string                    │
│      paddingBottom?: string                 │
│      paddingLeft?: string                   │
│      paddingRight?: string                  │
│      [other style props]                    │
│    }                                        │
│  }                                          │
└─────────────────────────────────────────────┘
```


## Build Process

```
┌──────────────┐
│  src/ files  │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│  Rollup Bundler      │
│                      │
│  • Resolve imports   │
│  • Bundle JS         │
│  • Extract CSS       │
│  • Minify            │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│     dist/            │
│                      │
│  • index.js (CJS)    │
│  • index.esm.js (ESM)│
│  • styles.css        │
└──────────────────────┘
       │
       ▼
┌──────────────────────┐
│   npm publish        │
└──────────────────────┘
```


## CSS Architecture

```
Each Block and UI Component Has Its Own CSS:

ParagraphBlock.jsx   →  ParagraphBlock.css
HeadingBlock.jsx     →  HeadingBlock.css
ListBlock.jsx        →  ListBlock.css
ImageBlock.jsx       →  ImageBlock.css
YouTubeBlock.jsx     →  YouTubeBlock.css
DividerBlock.jsx     →  DividerBlock.css
Toolbar.jsx          →  Toolbar.css
Editor.jsx           →  Editor.css

All CSS files are combined into dist/styles.css during build.
```


## Adding a New Block Type

```
1. Create Block Component
       └─── src/components/Blocks/YourBlock.jsx
       └─── src/components/Blocks/YourBlock.css

2. Add to Constants
       └─── src/utils/constants.js
                • Add to BLOCK_TYPES
                • Add to DEFAULT_STYLES

3. Add Helper Function
       └─── src/utils/blockHelpers.js
                • createYourBlock()

4. Add to Toolbar (if needed)
       └─── src/components/Toolbar/Toolbar.jsx
                • Import createYourBlock
                • Add button and handler

5. Add to Editor Renderer
       └─── src/components/Editor/Editor.jsx
                • Import YourBlock
                • Add case to renderBlock()
```
