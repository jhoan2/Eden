'use client'
import React, { useContext } from 'react'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
// Needs tiptap pro to use.
import UniqueID from '@tiptap-pro/extension-unique-id'
import Highlight from '@tiptap/extension-highlight'
import Youtube from '@tiptap/extension-youtube'
import { AppContext } from './AppProvider'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import EditorMenu from './EditorMenu'
import EditorFloatingMenu from './EditorFloatingMenu'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from "lowlight";


const Editor = () => {
  const { addToChangedNotes, allNotes, updateChangedNotes } = useContext(AppContext)
  
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mt-20 ml-10 dark:prose-invert w-screen h-screen focus:outline-none prose-img:rounded-xl ',
      },
    },
    extensions: [
      StarterKit.configure({
        CodeBlock: false,
      }),
      UniqueID.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: true, 
        HTMLAttributes: {
          class: 'bg-emerald-200'
        }
      }),
      Image,
      Youtube,
      Link,
      Underline,
      Subscript,
      Superscript,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: `
    <h1>Untitled...</h1>
    <hr />
    <p>
          Thats a boring paragraph followed by a fenced code block:
        </p>
        <pre><code class="language-javascript">for (var i=1; i <= 20; i++)
{
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
}</code></pre>
        <p>
          Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
        </p>
    `,
  onUpdate: ({ editor}) => {
    const json = editor.getJSON();
    console.log(json)
    const id = json.content[0].attrs.id;
    const title = json.content[0].content[0].text;
    //if the hashmap has the note then update it else add it. 
    if(allNotes.has(id)) {
      // update it
      updateChangedNotes({id: id, changedNotes: json})
    } else {
      allNotes.set(id, title)
      addToChangedNotes({id: id, changedNotes: json})
    }
    // const note = formatJSON(json)
    //format the json into an object,.
    //addToChangedNotes(json)
    //changedNote: [{}, {}]
  }
  })

  if (!editor) {
    return null
  }
//const json = editor.getJSON();

  return (
    <div>

    <EditorMenu editor={editor}/>
    {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} >
        <EditorFloatingMenu editor={editor} />
      </BubbleMenu>}
      <EditorContent editor={editor} />
    </div>

  )
}

export default Editor;