import React, { useState } from 'react';
import './ImageBlock.css';

export function ImageBlock({ block, onChange, onFocus, editable = true }) {
  const [isEditing, setIsEditing] = useState(!block.data.url);
  const [inputUrl, setInputUrl] = useState(block.data.url || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onChange({ url: inputUrl.trim() });
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setInputUrl(block.data.url || '');
  };

  if (editable && isEditing) {
    return (
      <div className="image-block-input" style={block.data.styles} onClick={onFocus}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter image URL..."
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            autoFocus
            className="image-url-input"
          />
          <div className="image-block-actions">
            <button type="submit" className="image-block-btn">Insert</button>
            {block.data.url && (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="image-block-btn"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="image-block-wrapper" style={block.data.styles} onClick={editable ? onFocus : undefined}>
      <img
        src={block.data.url}
        alt={block.data.alt || 'Image'}
        className="image-block"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'block';
        }}
      />
      <div className="image-error" style={{ display: 'none' }}>
        Failed to load image
      </div>
      {editable && (
        <button onClick={handleEdit} className="image-edit-btn">
          Edit URL
        </button>
      )}
    </div>
  );
}
