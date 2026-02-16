import React, { useState } from 'react';
import { ToolbarButton } from './ToolbarButton.jsx';
import { FONT_SIZE_OPTIONS, COLOR_OPTIONS, PADDING_OPTIONS, MARGIN_OPTIONS } from '../../utils/constants';
import './Toolbar.css';

const TEXT_TYPES = ['paragraph', 'heading', 'list'];

export function Toolbar({
  focusedBlock,
  onUpdateBlockStyle,
  onMoveBlockUp,
  onMoveBlockDown,
  onSave
}) {
  const [showFontSizePicker, setShowFontSizePicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [showPaddingPicker, setShowPaddingPicker] = useState(false);
  const [showMarginPicker, setShowMarginPicker] = useState(false);

  const hasFocusedBlock = !!focusedBlock;
  const isTextBlock = focusedBlock && TEXT_TYPES.includes(focusedBlock.type);
  const styles = focusedBlock?.data?.styles || {};

  const handleStyleChange = (updates) => {
    if (!hasFocusedBlock) return;
    onUpdateBlockStyle(updates);
  };

  const handleColorChange = (color) => {
    handleStyleChange({ color });
  };

  const handleFontSizeChange = (fontSize) => {
    handleStyleChange({ fontSize });
    setShowFontSizePicker(false);
  };

  const handleBorderColorChange = (borderColor) => {
    handleStyleChange({ borderColor, borderStyle: 'solid' });
  };

  const handleBgColorChange = (backgroundColor) => {
    handleStyleChange({ backgroundColor });
    setShowBgColorPicker(false);
  };

  const handleAllPadding = (value) => {
    handleStyleChange({
      paddingTop: value,
      paddingRight: value,
      paddingBottom: value,
      paddingLeft: value
    });
  };

  const handleAllMargin = (value) => {
    handleStyleChange({
      marginTop: value,
      marginRight: value,
      marginBottom: value,
      marginLeft: value
    });
  };

  const parsePx = (val) => parseInt(val, 10) || 0;

  return (
    <div className="toolbar">
      <div className="toolbar-sections">
        {/* Move controls */}
        <div className="toolbar-section">
          <ToolbarButton onClick={onMoveBlockUp} disabled={!hasFocusedBlock} title="Move Up">
            ↑
          </ToolbarButton>
          <ToolbarButton onClick={onMoveBlockDown} disabled={!hasFocusedBlock} title="Move Down">
            ↓
          </ToolbarButton>
        </div>

        <div className="toolbar-divider" />

        {/* Text Alignment */}
        <div className="toolbar-section">
          <label className="toolbar-label">Align:</label>
          <ToolbarButton
            onClick={() => handleStyleChange({ textAlign: 'left' })}
            disabled={!isTextBlock}
            active={isTextBlock && (styles.textAlign || 'left') === 'left'}
            title="Align Left"
          >
            <span className="align-icon align-left" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => handleStyleChange({ textAlign: 'center' })}
            disabled={!isTextBlock}
            active={isTextBlock && styles.textAlign === 'center'}
            title="Align Center"
          >
            <span className="align-icon align-center" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => handleStyleChange({ textAlign: 'right' })}
            disabled={!isTextBlock}
            active={isTextBlock && styles.textAlign === 'right'}
            title="Align Right"
          >
            <span className="align-icon align-right" />
          </ToolbarButton>
        </div>

        <div className="toolbar-divider" />

        {/* Font Size */}
        <div className="toolbar-section">
          <label className="toolbar-label">Font Size:</label>
          <div className="toolbar-dropdown">
            <ToolbarButton
              onClick={() => setShowFontSizePicker(!showFontSizePicker)}
              disabled={!isTextBlock}
              title="Font Size"
            >
              {styles.fontSize || '16px'}
            </ToolbarButton>
            {showFontSizePicker && (
              <div className="toolbar-dropdown-menu font-size-picker">
                {FONT_SIZE_OPTIONS.map(size => (
                  <button
                    key={size}
                    className="font-size-option"
                    onClick={() => handleFontSizeChange(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="toolbar-divider" />

        {/* Text Color */}
        <div className="toolbar-section">
          <label className="toolbar-label">Text Color:</label>
          <input
            type="color"
            className="toolbar-color-picker"
            value={styles.color || '#333333'}
            onChange={e => handleColorChange(e.target.value)}
            disabled={!isTextBlock}
            title="Text Color"
          />
        </div>

        <div className="toolbar-divider" />

        {/* Padding */}
        <div className="toolbar-section">
          <label className="toolbar-label">Padding:</label>
          <div className="toolbar-dropdown">
            <ToolbarButton
              onClick={() => setShowPaddingPicker(!showPaddingPicker)}
              disabled={!hasFocusedBlock}
              title="Padding (all sides)"
            >
              {styles.paddingTop || '0px'}
            </ToolbarButton>
            {showPaddingPicker && (
              <div className="toolbar-dropdown-menu padding-picker">
                {PADDING_OPTIONS.map(option => (
                  <button
                    key={option}
                    className="padding-option"
                    onClick={() => { handleAllPadding(option); setShowPaddingPicker(false); }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="toolbar-divider" />

        {/* Margin */}
        <div className="toolbar-section">
          <label className="toolbar-label">Margin:</label>
          <div className="toolbar-dropdown">
            <ToolbarButton
              onClick={() => setShowMarginPicker(!showMarginPicker)}
              disabled={!hasFocusedBlock}
              title="Margin (all sides)"
            >
              {styles.marginTop || '0px'}
            </ToolbarButton>
            {showMarginPicker && (
              <div className="toolbar-dropdown-menu margin-picker">
                {MARGIN_OPTIONS.map(option => (
                  <button
                    key={option}
                    className="margin-option"
                    onClick={() => { handleAllMargin(option); setShowMarginPicker(false); }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="toolbar-divider" />

        {/* Border Color */}
        <div className="toolbar-section">
          <label className="toolbar-label">Border Color:</label>
          <input
            type="color"
            className="toolbar-color-picker"
            value={styles.borderColor || '#cccccc'}
            onChange={e => handleBorderColorChange(e.target.value)}
            disabled={!hasFocusedBlock}
            title="Border Color"
          />
        </div>

        <div className="toolbar-divider" />

        {/* Border Width */}
        <div className="toolbar-section">
          <label className="toolbar-label">Border Width:</label>
          <input
            type="number"
            className="toolbar-input"
            min="0"
            value={parsePx(styles.borderWidth)}
            disabled={!hasFocusedBlock}
            onChange={(e) => handleStyleChange({ borderWidth: `${e.target.value}px`, borderStyle: 'solid' })}
            title="Border Width"
          />
        </div>

        <div className="toolbar-divider" />

        {/* Background Color */}
        <div className="toolbar-section">
          <label className="toolbar-label">Background Color:</label>
          <div className="toolbar-dropdown">
            <button
              className="toolbar-color-swatch"
              style={{ backgroundColor: hasFocusedBlock ? (styles.backgroundColor || '#ffffff') : '#cccccc' }}
              onClick={() => hasFocusedBlock && setShowBgColorPicker(!showBgColorPicker)}
              disabled={!hasFocusedBlock}
              title="Background Color"
            />
            {showBgColorPicker && (
              <div className="toolbar-dropdown-menu color-picker">
                {COLOR_OPTIONS.map(color => (
                  <button
                    key={color}
                    className="color-option"
                    style={{ backgroundColor: color }}
                    onClick={() => handleBgColorChange(color)}
                    title={color}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="toolbar-section">
        <ToolbarButton onClick={onSave} title="Save">
          💾 Save
        </ToolbarButton>
      </div>
    </div>
  );
}
