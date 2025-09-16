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
      modules={{
        toolbar: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'font': [] }],
          ['bold', 'italic', 'underline'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'align': [] }],
          ['link', 'image'],
          ['code-block', 'formula'],
          ['undo', 'redo']
        ]
      }}
      formats={[
        'header', 'font',
        'bold', 'italic', 'underline',
        'color', 'background',
        'list', 'bullet', 'align',
        'link', 'image',
        'code-block', 'formula',
        'undo', 'redo'
      ]}
      {...props}
    />
  )
}

export default RichTextEditor
