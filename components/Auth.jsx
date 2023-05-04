'use client'
import { useState, useEffect, useRef } from 'react'
import SocialLogin from '@biconomy/web3-auth'
import { ethers } from 'ethers'
import SmartAccount from '@biconomy/smart-account'
import { ChainId } from '@biconomy/core-types'
import { useNoteStore } from './store'

export default function Auth() {
    const [interval, enableInterval] = useState(false)
    const sdkRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const smartAccountAddress = useNoteStore((state) => state.smartAccountAddress)
    const updateSmartAccount = useNoteStore((state) => state.updateSmartAccount)

    useEffect(() => {
      let configureLogin
      if (interval) {
        configureLogin = setInterval(() => {
          if (!!sdkRef.current?.provider) {
            setupSmartAccount()
            clearInterval(configureLogin)
          }
        }, 1000)
      }
    }, [interval])
  
    async function login() {
      if (!sdkRef.current) {
        const socialLoginSDK = new SocialLogin()
        const signature1 = await socialLoginSDK.whitelistUrl('http://icarus.community/')
        await socialLoginSDK.init({
          chainId: ethers.utils.hexValue(ChainId.POLYGON_MUMBAI),
          whitelistUrls: {
            'http://icarus.community/': signature1,
          }
        })
        sdkRef.current = socialLoginSDK
      }
      if (!sdkRef.current.provider) {
        // sdkRef.current.showConnectModal()
        sdkRef.current.showWallet()
        enableInterval(true)
      } else {
        setupSmartAccount()
      }
    }
  
    async function setupSmartAccount() {
      if (!sdkRef?.current?.provider) return
      sdkRef.current.hideWallet()
      setLoading(true)
      const web3Provider = new ethers.providers.Web3Provider(
        sdkRef.current.provider
      )
      try {
        const smartAccount = new SmartAccount(web3Provider, {
          activeNetworkId: ChainId.POLYGON_MUMBAI,
          supportedNetworksIds: [ChainId.GOERLI, ChainId.POLYGON_MAINNET, ChainId.POLYGON_MUMBAI],
        })
        await smartAccount.init()
        updateSmartAccount(smartAccount.owner)
        setLoading(false)
      } catch (err) {
        console.log('error setting up smart account... ', err)
      }
    }
  
    const logout = async () => {
      if (!sdkRef.current) {
        console.error('Web3Modal not initialized.')
        return
      }
      await sdkRef.current.logout()
      sdkRef.current.hideWallet()
      updateSmartAccount(null)
      enableInterval(false)
    }
  
    return (
      <div >
        {
          !smartAccountAddress && !loading && <button onClick={login} className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-100'>Login</button>
        }
        {
          loading && <p>Loading account details...</p>
        }
        {
          !!smartAccountAddress && (
            <div className='max-w-xs'>
              <h3>Smart account address:</h3>
              <p className='truncate'>{smartAccountAddress}</p>
              <button  onClick={logout} className='inline-flex w-auto justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-100'>Logout</button>
            </div>
          )
        }
      </div>
    )
  }