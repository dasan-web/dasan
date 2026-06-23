'use client';

import { useEffect, useRef } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = '본문 내용을 입력해주세요.' }: RichTextEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);
  const isUpdatingRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current || quillRef.current) return;

    // Load CSS dynamically to avoid compile/SSR issues
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/quill@2/dist/quill.snow.css';
    document.head.appendChild(link);

    // Import Quill dynamically
    import('quill').then((QuillModule) => {
      const Quill = QuillModule.default;

      if (!containerRef.current || quillRef.current) return;

      // Register custom fonts
      const Font = Quill.import('formats/font') as any;
      Font.whitelist = [
        'notosanskr',
        'nanumgothic',
        'nanummyeongjo',
        'gowunbatang',
        'gowundodum',
        'blackhansans',
        'jua',
        'nanumpenscript'
      ];
      Quill.register(Font, true);

      const q = new Quill(containerRef.current, {
        theme: 'snow',
        placeholder,
        modules: {
          toolbar: [
            [{ font: [
              'notosanskr',
              'nanumgothic',
              'nanummyeongjo',
              'gowunbatang',
              'gowundodum',
              'blackhansans',
              'jua',
              'nanumpenscript'
            ] }],
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ align: [] }],
            [{ color: [] }, { background: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'clean'],
          ],
        },
      });

      quillRef.current = q;

      // Set initial content
      if (value) {
        q.clipboard.dangerouslyPasteHTML(value);
      }

      // Handle text change
      q.on('text-change', () => {
        if (isUpdatingRef.current) return;
        const html = containerRef.current?.querySelector('.ql-editor')?.innerHTML || '';
        
        // Clean empty editor content to simple empty string
        if (html === '<p><br></p>') {
          onChange('');
        } else {
          onChange(html);
        }
      });
    });

    return () => {
      // Cleanup stylesheet on unmount
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, []);

  // Update editor content when external value changes (e.g. from modal open, clear)
  useEffect(() => {
    if (quillRef.current) {
      const currentHTML = containerRef.current?.querySelector('.ql-editor')?.innerHTML || '';
      // Only update if the value is structurally different and we are not currently typing
      if (value !== currentHTML) {
        isUpdatingRef.current = true;
        
        // Clear editor if value is empty
        if (!value || value === '<p><br></p>') {
          quillRef.current.setText('');
        } else {
          quillRef.current.clipboard.dangerouslyPasteHTML(value);
        }
        
        isUpdatingRef.current = false;
      }
    }
  }, [value]);

  return (
    <div className="bg-[#0b1329] border border-white/10 rounded-xl overflow-hidden text-sm ql-dark-editor">
      <style jsx global>{`
        /* Dark Theme Styling for Quill Rich Text Editor */
        .ql-dark-editor .ql-toolbar {
          background-color: #0d1630 !important;
          border-color: rgba(255, 255, 255, 0.1) !important;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        }
        .ql-dark-editor .ql-container {
          background-color: #070b19 !important;
          border-color: rgba(255, 255, 255, 0.1) !important;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
        }
        .ql-dark-editor .ql-editor {
          color: #f3f4f6 !important;
          font-family: inherit;
        }
        .ql-dark-editor .ql-editor.ql-blank::before {
          color: rgba(255, 255, 255, 0.35) !important;
        }
        /* Toolbar controls white color adaptation */
        .ql-dark-editor .ql-stroke {
          stroke: #9ca3af !important;
        }
        .ql-dark-editor .ql-fill {
          fill: #9ca3af !important;
        }
        .ql-dark-editor .ql-picker {
          color: #9ca3af !important;
        }
        .ql-dark-editor .ql-picker-options {
          background-color: #0d1630 !important;
          border-color: rgba(255, 255, 255, 0.1) !important;
        }
        .ql-dark-editor .ql-picker-item:hover,
        .ql-dark-editor .ql-picker-label:hover {
          color: #10b981 !important;
        }
        .ql-dark-editor .ql-picker-item:hover .ql-stroke,
        .ql-dark-editor .ql-picker-label:hover .ql-stroke {
          stroke: #10b981 !important;
        }
        .ql-dark-editor .ql-picker-item:hover .ql-fill,
        .ql-dark-editor .ql-picker-label:hover .ql-fill {
          fill: #10b981 !important;
        }
      `}</style>
      <div ref={containerRef} style={{ minHeight: '220px' }} />
    </div>
  );
}
