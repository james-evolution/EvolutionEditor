import React, { useState } from 'react';
import { extractYouTubeId } from '../../utils/blockHelpers';
import './YouTubeBlock.css';

export function YouTubeBlock({ block, onChange, onFocus, editable = true }) {
  const [isEditing, setIsEditing] = useState(!block.data.videoId);
  const [inputUrl, setInputUrl] = useState(block.data.url || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inputUrl.trim()) {
      const videoId = extractYouTubeId(inputUrl.trim());
      if (videoId) {
        onChange({ url: inputUrl.trim(), videoId });
        setIsEditing(false);
      } else {
        alert('Invalid YouTube URL. Please enter a valid YouTube video link.');
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setInputUrl(block.data.url || '');
  };

  if (editable && isEditing) {
    return (
      <div className="youtube-block-input" style={block.data.styles} onClick={onFocus}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter YouTube URL..."
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            autoFocus
            className="youtube-url-input"
          />
          <div className="youtube-block-actions">
            <button type="submit" className="youtube-block-btn">Embed</button>
            {block.data.videoId && (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="youtube-block-btn"
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
    <div className="youtube-block-wrapper" style={block.data.styles} onClick={editable ? onFocus : undefined}>
      <div className="youtube-embed">
        <iframe
          src={`https://www.youtube.com/embed/${block.data.videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video"
        />
      </div>
      {editable && (
        <button onClick={handleEdit} className="youtube-edit-btn">
          Change Video
        </button>
      )}
    </div>
  );
}
