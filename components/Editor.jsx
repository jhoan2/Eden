'use client'
import React, { useState } from 'react'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
// Needs tiptap pro to use.
import UniqueID from '@tiptap-pro/extension-unique-id'
import Highlight from '@tiptap/extension-highlight'
import Youtube from '@tiptap/extension-youtube'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import EditorMenu from './EditorMenu'
import EditorFloatingMenu from './EditorFloatingMenu'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from "lowlight";
import { Plugin } from '@tiptap/pm/state'
import { Database } from "@tableland/sdk";
import { useNoteStore } from './store'
import { create } from 'ipfs-http-client'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_PROJECT_SECRET;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
  headers: {
    authorization: auth,
  }
})

const Editor = ({noteId, value, setContent }) => {
  const [ saving, setSaving ] = useState(false)
  const { user, updateNoteInFolder, setNoteTreeChanged } = useNoteStore();
  const { owned_table: userTable } = user
  let content = value.content

  const checkIfInTable = async (id, userTable) => {
    const db = Database.readOnly("maticmum");
    const { results } = await db
      .prepare(`SELECT * FROM ${userTable} WHERE id=?;`)
      .bind(id)
      .run();
    if(results.length === 0) {
      return false 
    } else {
      return true 
    }
  }

  const addToUpdateNotes = ({id, cid}) => {
    useNoteStore.setState((state) => ({
      updateNotes: new Map(state.updateNotes).set(id, cid)
    }))
  }

  const addToInsertNotes = ({id, cid}) => {
    useNoteStore.setState((state) => ({
      insertNotes: new Map(state.insertNotes).set(id, cid)
    }))
  }

  const save = async (contentToSave) => {
    setSaving(true)
    const { id, title } = contentToSave;
    try {
      const [data, isInTable] = await Promise.all([
        await fetch(`http://localhost:3000/api/notesById/`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contentToSave)
        }),
        checkIfInTable(id, userTable)
      ])
      let cid = await data.json()
      cid.title = title
      if(isInTable) {
        addToUpdateNotes({id: id, cid: cid})
      } else {
        addToInsertNotes({id: id, cid: cid})
      }
      updateNoteInFolder({id: id, cid: cid})
      setNoteTreeChanged()
    } catch (e) {
      console.log({message: e})
    } finally {
      setSaving(false)
    }
  }

  const CustomImage =  Image.extend({
    addProseMirrorPlugins() {
      return [
        new Plugin({
          props: {
            handleDOMEvents: {
              paste(view, event) {
                const hasFiles =
                  event.clipboardData &&
                  event.clipboardData.files &&
                  event.clipboardData.files.length
  
                if (!hasFiles) {
                  return
                }
  
                const images = Array.from(
                  event.clipboardData.files
                ).filter(file => /image/i.test(file.type))
  
                if (images.length === 0) {
                  return
                }
  
                event.preventDefault()
  
                const { schema } = view.state
  
                images.forEach(image => {
                  const reader = new FileReader()
  
                  reader.onload = () => {
                    uploadImage(image).then(function(response) {
                      const url = `https://icarus.infura-ipfs.io/ipfs/${response}`
                      const node = schema.nodes.image.create({
                        src: url
                      })
                      const transaction = view.state.tr.replaceSelectionWith(node)
                      view.dispatch(transaction)
                    })
                  }
                  reader.readAsDataURL(image)
                })
              }
            }
          }
        })
      ]
    }
  })

  const handleImageDrop = (view, event, slice, moved) => {
    if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) { 
      let file = event.dataTransfer.files[0]; 
      let filesize = ((file.size/1024)/1024).toFixed(4); 
      if ((file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg") && filesize < 10) { 
        // check the dimensions
        let _URL = window.URL || window.webkitURL;
        let img = document.createElement("img");
        img.src = _URL.createObjectURL(file);
        img.onload = function () {
          if (this.width > 5000 || this.height > 5000) {
            window.alert("Your images need to be less than 5000 pixels in height and width."); // display alert
          } else {
            uploadImage(file).then(function(response) { 
                // place the now uploaded image in the editor where it was dropped
                const url = `https://icarus.infura-ipfs.io/ipfs/${response}`
                let image = document.createElement("img");
                image.src = url;
                image.onload = function () {
                  const { schema } = view.state;
                  const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
                  const node = schema.nodes.image.create({ src: url }); // creates the image element
                  const transaction = view.state.tr.insert(coordinates.pos, node); // places it in the correct position
                  return view.dispatch(transaction);
                }
            }).catch(function(error) {
              if (error) {
                console.log({err: error})
                window.alert("There was a problem uploading your image, please try again.");
              }
            });
          }
        };
      } else {
        window.alert("Images need to be in jpg or png format and less than 10mb in size.");
      }
      return true; // handled
    }
    return false; // not handled use default behaviour
  }

  const uploadImage = async (file) => {
    try {
      const cid = await ipfs.add(file)
      return cid?.path
    } catch (e) {
      console.log({message: e})
    }
  };

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mt-20 ml-10 dark:prose-invert w-screen h-screen focus:outline-none prose-img:rounded-xl',
      },
      handleDrop: handleImageDrop,
    },
    extensions: [
      StarterKit.configure({
        codeBlock: false,
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
      CustomImage,
      Youtube,
      Link,
      Underline,
      Subscript,
      Superscript,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Placeholder.configure({
        placeholder: 'Untitled...',
      })
    ],
    content: content,
  onUpdate: ({ editor}) => {
    const json = editor.getJSON();
    const id = noteId
    if(json?.content[1]?.content) {
      const title = json.content[0]?.content[0].text;
      setContent({id: id, title: title, content: json})
    }
  }
  })


  if (!editor) {
    return null
  }

  return (
    <div>
    <EditorMenu editor={editor} save={save} saving={saving} value={value} />
    {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} >
        <EditorFloatingMenu editor={editor} />
      </BubbleMenu>}
      <EditorContent editor={editor} />
    </div>

  )
}

export default Editor;