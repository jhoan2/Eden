'use client'
import React, { useEffect } from 'react'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
// Needs tiptap pro to use.
import UniqueID from '@tiptap-pro/extension-unique-id'


const Tiptap = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mt-20 ml-10 dark:prose-invert w-screen h-screen focus:outline-none  ',
      },
    },
    extensions: [
      StarterKit,
      UniqueID.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: `
    <h1>Untitled...</h1>
    <p>Start typing here..</p>
    `,
    
  })

  if (!editor) {
    return null
  }
//const json = editor.getJSON();

  return (
    <div >


    {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          strike
        </button>
      </BubbleMenu>}
      <EditorContent editor={editor} />
    </div>

  )
}

export default Tiptap;