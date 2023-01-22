'use client'
import ConnectKitWrapper from './ConnectKitWrapper'
import AppProvider from './AppProvider'

export default function Providers({children}) {
  return (
    <ConnectKitWrapper>
        <AppProvider>
            {children}
        </AppProvider>
    </ConnectKitWrapper>
  )
}
