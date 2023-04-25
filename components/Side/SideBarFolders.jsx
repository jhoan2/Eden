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
      {noteTree ? 
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
      : <div><p className='text-lg'>No notes yet.</p></div>}
    </div>
  )
}
