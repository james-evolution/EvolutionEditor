import React from 'react';

export function ToolbarButton({ onClick, children, title, active, disabled }) {
  return (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`toolbar-button ${active ? 'active' : ''}`}
      type="button"
    >
      {children}
    </button>
  );
}
