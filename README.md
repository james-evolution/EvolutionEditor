
# Evolution Editor (Overview)

Evolution Editor is a standalone, rich text editor React component designed for easy integration into any React project. It supports both read-only and editable modes, JSON import/export, and theming via CSS variables.



## Table of Contents
- [Features](#features)
- [Installation & Import](#installation--import)
- [Props](#props)
- [Styling Guidelines](#styling-guidelines)
- [Example Usage](#example-usage)
- [Example handleSave Function](#example-handlesave-function)
- [Read-Only vs Edit Modes](#read-only-vs-edit-modes)
- [JSON Exporting](#json-exporting)
- [JSON Export Structure](#json-export-structure)



## Features

**User Features**
- 📝 Paragraph & Heading blocks (H1, H2, H3)
- 🎨 Text color & font size customization
- 📋 Ordered & unordered lists (with nesting)
- 🖼️ Image embeds via URL
- 🎥 YouTube video embeds via URL (share-link URL, not embed HTML)
- ➖ Horizontal dividers
- 💾 JSON import/export
- 🧩 Customizable styles, colors, and font sizes

**Developer Features**
- Modular, block-based architecture
- Extensible: add new block types easily



## Requirements

Evolution Editor is a React component library. To use it in your project (whether installed from npm or otherwise), your project must be a React project with `react` and `react-dom` as dependencies.

### Quick Start: Create a React Project

If you need to create a new React project, you can use Create React App:

```bash
npx create-react-app my-app
```

Replace `my-app` with your desired project name. Once your React project is set up, you can install Evolution Editor from npm and start using it as described below.



## Installation & Import

### Install from npm
```bash
npm install @evolution-james/evolution-editor
```

### Import the component
```jsx
import { EvolutionEditor } from '@evolution-james/evolution-editor';
import '@evolution-james/evolution-editor/dist/styles.css';
```



## Props

| Prop           | Type       | Required | Description                                                                 |
|----------------|------------|----------|-----------------------------------------------------------------------------|
| `initialData`  | `object`   | No       | JSON object representing the editor's initial content.                      |
| `onSave`       | `function` | No       | Callback invoked with JSON when the user saves (edit mode only).            |
| `editable`     | `boolean`  | No       | If true, enables editing. If false/omitted, editor is read-only.            |
| `placeholder`  | `string`   | No       | Placeholder text for empty editor (edit mode only).                         |
| `showBranding` | `boolean`  | No       | If true (default), displays the Evolution Editor brand/logo at the top, during edit mode. If false, branding is hidden. In read-only mode, branding is always hidden regardless. |



## Styling Guidelines

### Parent Container CSS Class

To constrain the size of your editor, I recommend wrapping it in a container element, such as a ```<div>``` with the class ```.container``` You can then apply styling as you'd like. For example, if you wish to restrict its width to 80% of the viewport and it's height to 800 pixels, and you wish to center it, you could do this:

```css
.container {
  height: 800px !important;
  width: 80%; !important;
  margin: auto;
}
```


### CSS Variables Used

Evolution Editor uses the following CSS variables for theming. Define these in your global CSS or :root for custom themes:

- `--color-bg`           – Editor background
- `--color-text`         – Editor text color
- `--color-card-bg`      – Toolbar and block background
- `--color-card-border`  – Toolbar and block border
- `--color-divider`      – Toolbar divider
- `--color-btn-light-bg` – Toolbar button hover



## Example Usage

```jsx
  <div className="container">
    <EvolutionEditor
      initialData={myJson}
      onSave={handleSave}
      editable={true}
      placeholder="Start writing..."
      showBranding={false} // Hide branding/logo (optional)
    />
  </div>
```



## Example handleSave Function

A typical usage pattern is to keep the editor's content in React state and update it whenever the user saves. This ensures the editor always displays the latest content:

```jsx
import React, { useState } from 'react';
import { EvolutionEditor } from './evolution-editor';

function MyEditorContainer() {
  const [editorContent, setEditorContent] = useState(initialJson); // initialJson is your starting data

  function handleSave(newJson) {
    setEditorContent(newJson); // Update state with the new content
    // Optionally, persist to server/localStorage here
    // localStorage.setItem('myEditorContent', JSON.stringify(newJson));
    // fetch('/api/save', { method: 'POST', body: JSON.stringify(newJson) });
    console.log('Editor content saved:', newJson);
  }

  return (
    <div className="container">
      <EvolutionEditor
        initialData={editorContent}
        onSave={handleSave}
        editable={true}
        placeholder="Start writing..."
      />
    </div>
  );
}
```

This pattern keeps the editor’s content in sync with your app’s state and ensures the latest content is always shown.



## Read-Only vs Edit Modes

- **Edit Mode (`editable={true}`):**
  - User can type, format, and manipulate content.
  - Toolbar is visible.
  - `onSave` callback is available.
- **Read-Only Mode (`editable={false}` or omitted):**
  - Content is rendered as static HTML.
  - Toolbar and editing controls are hidden.


## JSON Exporting

- The editor's content is stored as a JSON object.
- To export, use the `onSave` callback, which receives the current JSON when the user saves.
- You can also access the editor's state via ref if needed (see advanced usage).


## JSON Export Structure

Evolution Editor exports/imports content as a JSON object with the following structure:

```json
{
  "version": "1.0.0",
  "time": 1645123456789,
  "blocks": [
    {
      "id": "block_unique_id",
      "type": "heading",
      "data": {
        "level": 1,
        "text": "My Title",
        "htmlTag": "h1",
        "styles": {
          "color": "#000000",
          "fontSize": "32px",
          "marginTop": "0px",
          "marginBottom": "16px",
          "marginLeft": "0px",
          "marginRight": "0px",
          "paddingTop": "0px",
          "paddingBottom": "0px",
          "paddingLeft": "0px",
          "paddingRight": "0px"
        }
      }
    },
    {
      "id": "block_2",
      "type": "image",
      "data": {
        "url": "https://example.com/image.jpg",
        "alt": "Alt text",
        "styles": {
          "maxWidth": "100%"
        }
      }
    },
    {
      "id": "block_3",
      "type": "youtube",
      "data": {
        "videoId": "VIDEO_ID",
        "styles": {
          "width": "560px",
          "height": "315px"
        }
      }
    }
    // ...other blocks
  ]
}
```

Each block type has its own `data` structure. See the source code for more details on each block's properties.

