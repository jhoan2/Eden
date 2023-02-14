'use client'
import AppProvider from './AppProvider'

export default function Providers({children}) {
  return (
        <AppProvider>
            {children}
        </AppProvider>
  )
}
