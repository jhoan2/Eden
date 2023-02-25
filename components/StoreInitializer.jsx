'use client'
import { useRef } from 'react';
import { useNoteStore } from './store';

export default function StoreInitializer({noteTree}) {
    const initialized = useRef(false);
    if (!initialized.current) {
        useNoteStore.setState({noteTree});
        initialized.current = true;
    }
  return (
    null
  )
}
