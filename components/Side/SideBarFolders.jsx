import React, { useState } from 'react';
import {
  SimpleTreeItemWrapper,
  SortableTree,
} from 'dnd-kit-sortable-tree';

const initialViableMinimalData = [
  {
    id: '1',
    value: 'Jane',
    children: [
      { id: '4', value: 'John' },
      { id: '5', value: 'Sally' },
    ],
  },
  { id: '2', value: 'Fred', children: [{ id: '6', value: 'Eugene' }] },
  { id: '3', value: 'Helen', canHaveChildren: false },
  { id: '7', value: 'Helen', canHaveChildren: false },
  { id: '8', value: 'Helen', canHaveChildren: false },
  { id: '9', value: 'Helen', canHaveChildren: false },
  { id: '10', value: 'Helen', canHaveChildren: false },
  { id: '11', value: 'Helen', canHaveChildren: false },
  { id: '12', value: 'Helen', canHaveChildren: false },
  { id: '13', value: 'Helen', canHaveChildren: false },
  { id: '14', value: 'Helen', canHaveChildren: false },
  { id: '15', value: 'Helen', canHaveChildren: false },
  { id: '16', value: 'Helen', canHaveChildren: false },
  { id: '17', value: 'Helen', canHaveChildren: false },
];


const MinimalTreeItemComponent = React.forwardRef((props, ref) => (
  <SimpleTreeItemWrapper {...props} ref={ref} disableCollapseOnItemClick>
    <div className='inline-flex w-full justify-center  bg-white px-4 py-2 border text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2  focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-100'>
      <button onClick={() => console.log('hello')}>
        {props.item.value}
      </button>
    </div>
  </SimpleTreeItemWrapper>
));

export default function SideBarFolders() {

  const [items, setItems] = useState(initialViableMinimalData);
  return (
    <SortableTree
      items={items}
      onItemsChanged={setItems}
      TreeItemComponent={MinimalTreeItemComponent}
    />
  )
}
