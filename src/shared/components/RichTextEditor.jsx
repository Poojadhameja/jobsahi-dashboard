import React from 'react'
import { Editor } from 'primereact/editor'

const RichTextEditor = ({ 
  value = '', 
  onChange, 
  placeholder = 'Enter text...', 
  height = '200px',
  className = '',
  required = false,
  ...props 
}) => {
  const handleTextChange = (e) => {
    if (onChange) {
      onChange(e.htmlValue)
    }
  }

  return (
    <Editor
      value={value}
      onTextChange={handleTextChange}
      style={{ height }}
      placeholder={placeholder}
      className={`w-full ${className}`}
      showHeader={true} // ✅ enables default toolbar safely
      {...props}
    />
  )
}

export default RichTextEditor
