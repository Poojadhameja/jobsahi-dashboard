import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { COLORS } from '../WebConstant';

const TextEditor = ({ 
  value = '', 
  onChange, 
  placeholder = 'Start typing...', 
  height = '200px',
  readOnly = false,
  className = ''
}) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [editorValue, setEditorValue] = useState(value);

  // Initialize Quill editor
  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      // Clear any existing content
      editorRef.current.innerHTML = '';
      
      // Check if Quill is already initialized on this element
      if (editorRef.current.querySelector('.ql-toolbar')) {
        return;
      }
      
      // Initialize Quill editor
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: placeholder,
        readOnly: readOnly,
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'align': [] }],
            ['link', 'image'],
            [{ 'color': [] }, { 'background': [] }],
            ['clean']
          ]
        },
        formats: [
          'header', 'bold', 'italic', 'underline', 'strike',
          'list', 'bullet', 'indent', 'align',
          'link', 'image', 'color', 'background'
        ]
      });

      // Set initial value
      if (value) {
        quillRef.current.root.innerHTML = value;
      }

      // Listen for text changes
      quillRef.current.on('text-change', () => {
        const html = quillRef.current.root.innerHTML;
        setEditorValue(html);
        onChange?.(html);
      });

      // Customize editor appearance
      const editor = editorRef.current.querySelector('.ql-editor');
      if (editor) {
        editor.style.minHeight = height;
        editor.style.color = COLORS.PRIMARY;
        editor.style.fontSize = '14px';
        editor.style.lineHeight = '1.5';
      }

      // Customize toolbar appearance
      const toolbar = editorRef.current.querySelector('.ql-toolbar');
      if (toolbar) {
        toolbar.style.borderColor = COLORS.GRAY_200;
        toolbar.style.backgroundColor = COLORS.GRAY_50;
      }

      // Customize editor border
      const container = editorRef.current.querySelector('.ql-container');
      if (container) {
        container.style.borderColor = COLORS.GRAY_200;
      }

      setIsReady(true);
    }

    // Cleanup function
    return () => {
      if (quillRef.current) {
        quillRef.current.off('text-change');
        quillRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  // Update editor content when value prop changes (but only if different)
  useEffect(() => {
    if (quillRef.current && isReady && value !== editorValue) {
      quillRef.current.root.innerHTML = value;
      setEditorValue(value);
    }
  }, [value, isReady, editorValue]);

  // Update readOnly state
  useEffect(() => {
    if (quillRef.current && isReady) {
      quillRef.current.enable(!readOnly);
    }
  }, [readOnly, isReady]);

  return (
    <div className={`text-editor-wrapper ${className}`}>
      <div 
        ref={editorRef}
        id="quill-editor-container"
        style={{
          border: `1px solid ${COLORS.GRAY_200}`,
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      />
    </div>
  );
};

export default TextEditor;
