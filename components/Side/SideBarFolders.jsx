'use client'
import React from 'react';
import {
  SimpleTreeItemWrapper,
  SortableTree,
} from 'dnd-kit-sortable-tree';
import { useNoteStore } from '../store';
import dynamic from 'next/dynamic';

const CustomTreeItem = ({ item, showfoldernotes }) => {
  return (
      <div className='inline-flex w-full justify-center bg-white border text-clip text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2  focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-100'>
        <button onClick={() => showfoldernotes(item)}>
          {item.value}
        </button>
      </div>
  );
};

const CustomDeleteTreeItem = ({ item, deletefoldernotes }) => {
  return (
      <div className='inline-flex w-full justify-center border-red-500 bg-white border text-clip text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2  focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-100'>
        <button onClick={() => deletefoldernotes(item)}>
          {item.value}
        </button>
      </div>
  );
};
const MinimalTreeItemComponent = React.forwardRef((props, ref) => (
  //I can get access to the id through props.item.id
  //props.user or props.item.value
  <SimpleTreeItemWrapper {...props} ref={ref} disableCollapseOnItemClick >
      <CustomTreeItem item={props.item} showfoldernotes={props.showfoldernotes} />
  </SimpleTreeItemWrapper>
));

const DeleteTreeItemComponent = React.forwardRef((props, ref) => (
  //I can get access to the id through props.item.id
  //props.user or props.item.value
  <SimpleTreeItemWrapper {...props} ref={ref} disableCollapseOnItemClick >
      <CustomDeleteTreeItem item={props.item} deletefoldernotes={props.deletefoldernotes} />
  </SimpleTreeItemWrapper>
));


const setNoteTree = (items, noteTreeChanged, setNoteTreeChanged) => {
  if(!noteTreeChanged) {setNoteTreeChanged()}
  useNoteStore.setState({noteTree: items})
}


export default function SideBarFolders({setToggleNoteList, deleteFolders}) {
  const { noteTree, noteTreeChanged, setNoteTreeChanged, updateCurrentFolder, deleteFolderById } = useNoteStore();
  const showfoldernotes = ({id, value}) => {
    setToggleNoteList(false)
    updateCurrentFolder({id: id, value: value})
  }

  const deletefoldernotes = ({id}) => {
    deleteFolderById(id)
    setNoteTreeChanged(true)
  }

  return (
    <div>
      {noteTree.length > 0 ? 
        <div>
          { deleteFolders ?
            <SortableTree
            items={noteTree}
            onItemsChanged={(items) => setNoteTree(items, noteTreeChanged, setNoteTreeChanged)}
            TreeItemComponent={DeleteTreeItemComponent}
            deletefoldernotes={deletefoldernotes}
            disableSorting={true}
            /> :
            <SortableTree
            items={noteTree}
            onItemsChanged={(items) => setNoteTree(items, noteTreeChanged, setNoteTreeChanged)}
            TreeItemComponent={MinimalTreeItemComponent}
            showfoldernotes={showfoldernotes}
            disableSorting={true}
            /> 
          }
        </div>
      : <div>
          <p className='text-lg'>No notes yet.</p>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">1. Take notes </h3>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">2. Save</h3>
          <p className='mb-4 text-base font-normal text-gray-500 dark:text-gray-400'>The green save button will be in the editor. Click once you are done making your edits.</p>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">3. Commit</h3>
          <p className='mb-4 text-base font-normal text-gray-500 dark:text-gray-400'>Committing requires your signature, and it is the second tab on the left side bar.</p>
          <p className='mb-4 text-base font-medium text-red-500 dark:text-gray-400'>Committing makes your notes public so don't commit information you don't want public such as personal information</p>
        </div>
      }
    </div>
  )
}
