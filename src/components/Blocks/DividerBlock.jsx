import React from 'react';
import './DividerBlock.css';

export function DividerBlock({ block, onFocus }) {
  return (
    <div className="divider-block-wrapper" style={block.data.styles} onClick={onFocus}>
      <hr className="divider-block" />
    </div>
  );
}
