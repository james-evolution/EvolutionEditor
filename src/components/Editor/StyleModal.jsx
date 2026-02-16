import React from 'react';
import { BLOCK_TYPES, FONT_SIZE_OPTIONS } from '../../utils/constants';

const TEXT_BLOCK_TYPES = [BLOCK_TYPES.PARAGRAPH, BLOCK_TYPES.HEADING, BLOCK_TYPES.LIST];

function StyleField({ label, value, onChange, type = 'text', suffix = '' }) {
  if (type === 'color') {
    return (
      <div className="style-modal-field">
        <label>{label}</label>
        <input
          type="color"
          value={value || '#000000'}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  if (type === 'font-size') {
    const numericValue = parseInt(value, 10) || 16;
    return (
      <div className="style-modal-field">
        <label>{label}</label>
        <div className="style-modal-font-size">
          <select
            value={FONT_SIZE_OPTIONS.includes(value) ? value : ''}
            onChange={(e) => {
              if (e.target.value) onChange(e.target.value);
            }}
          >
            <option value="" disabled>Common sizes</option>
            {FONT_SIZE_OPTIONS.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <div className="style-modal-input-wrapper">
            <input
              type="number"
              min="1"
              value={numericValue}
              onChange={(e) => onChange(`${e.target.value}px`)}
            />
            <span className="style-modal-suffix">px</span>
          </div>
        </div>
      </div>
    );
  }

  const numericValue = parseInt(value, 10) || 0;

  return (
    <div className="style-modal-field">
      <label>{label}</label>
      <div className="style-modal-input-wrapper">
        <input
          type="number"
          min="0"
          value={numericValue}
          onChange={(e) => onChange(`${e.target.value}${suffix}`)}
        />
        {suffix && <span className="style-modal-suffix">{suffix}</span>}
      </div>
    </div>
  );
}

export function StyleModal({ block, onUpdateStyle, onClose }) {
  const styles = block.data.styles || {};
  const isTextBlock = TEXT_BLOCK_TYPES.includes(block.type);

  const handleChange = (prop, value) => {
    const updates = { [prop]: value };
    if (prop === 'borderWidth' || prop === 'borderColor') {
      updates.borderStyle = 'solid';
    }
    onUpdateStyle(block.id, updates);
  };

  const handleAllMargins = (value) => {
    onUpdateStyle(block.id, {
      marginTop: value,
      marginRight: value,
      marginBottom: value,
      marginLeft: value
    });
  };

  const handleAllPadding = (value) => {
    onUpdateStyle(block.id, {
      paddingTop: value,
      paddingRight: value,
      paddingBottom: value,
      paddingLeft: value
    });
  };

  return (
    <div className="style-modal-overlay" onMouseDown={onClose}>
      <div className="style-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="style-modal-header">
          <h3>Edit Block Style</h3>
          <button className="style-modal-close" onClick={onClose}>×</button>
        </div>

        <div className="style-modal-body">
          {isTextBlock && (
            <>
              <div className="style-modal-section">
                <h4>Text</h4>
                <div className="style-modal-row">
                  <StyleField
                    label="Font Size"
                    value={styles.fontSize}
                    onChange={(v) => handleChange('fontSize', v)}
                    type="font-size"
                  />
                  <StyleField
                    label="Color"
                    value={styles.color}
                    onChange={(v) => handleChange('color', v)}
                    type="color"
                  />
                </div>
              </div>
              <hr className="style-modal-divider" />
            </>
          )}

          <div className="style-modal-section">
            <h4>Margin</h4>
            <div className="style-modal-row">
              <StyleField label="All" value={styles.marginAll || ''} onChange={(v) => { handleAllMargins(v); handleChange('marginAll', v); }} suffix="px" />
              <StyleField label="Top" value={styles.marginTop} onChange={(v) => handleChange('marginTop', v)} suffix="px" />
              <StyleField label="Right" value={styles.marginRight} onChange={(v) => handleChange('marginRight', v)} suffix="px" />
              <StyleField label="Bottom" value={styles.marginBottom} onChange={(v) => handleChange('marginBottom', v)} suffix="px" />
              <StyleField label="Left" value={styles.marginLeft} onChange={(v) => handleChange('marginLeft', v)} suffix="px" />
            </div>
          </div>

          <hr className="style-modal-divider" />

          <div className="style-modal-section">
            <h4>Padding</h4>
            <div className="style-modal-row">
              <StyleField label="All" value={styles.paddingAll || ''} onChange={(v) => { handleAllPadding(v); handleChange('paddingAll', v); }} suffix="px" />
              <StyleField label="Top" value={styles.paddingTop} onChange={(v) => handleChange('paddingTop', v)} suffix="px" />
              <StyleField label="Right" value={styles.paddingRight} onChange={(v) => handleChange('paddingRight', v)} suffix="px" />
              <StyleField label="Bottom" value={styles.paddingBottom} onChange={(v) => handleChange('paddingBottom', v)} suffix="px" />
              <StyleField label="Left" value={styles.paddingLeft} onChange={(v) => handleChange('paddingLeft', v)} suffix="px" />
            </div>
          </div>

          <hr className="style-modal-divider" />

          <div className="style-modal-section">
            <h4>Border</h4>
            <div className="style-modal-row">
              <StyleField
                label="Width"
                value={styles.borderWidth}
                onChange={(v) => handleChange('borderWidth', v)}
                suffix="px"
              />
              <StyleField
                label="Color"
                value={styles.borderColor}
                onChange={(v) => handleChange('borderColor', v)}
                type="color"
              />
            </div>
          </div>

          <hr className="style-modal-divider" />

          <div className="style-modal-section">
            <h4>Background</h4>
            <div className="style-modal-row">
              <StyleField
                label="Color"
                value={styles.backgroundColor}
                onChange={(v) => handleChange('backgroundColor', v)}
                type="color"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
