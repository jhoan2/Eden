'use client'
import { useState, useEffect } from 'react'

//Use this where ever you use ConnectKitButton.
function useIsMounted() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
  
    }, []);
  
    return isMounted;
}

export default useIsMounted;