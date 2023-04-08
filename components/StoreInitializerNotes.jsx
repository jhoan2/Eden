'use client'
import { useRef } from 'react';
import { useNoteStore } from './store';

export default function StoreInitializerNotes({notes}) {
    const initialized = useRef(false);
    if (!initialized.current) {
        useNoteStore.setState();
        initialized.current = true;
    }
  return (
    null
  )
}