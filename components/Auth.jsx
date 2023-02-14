'use client'
import { useState, useEffect, useRef } from 'react'
import SocialLogin from '@biconomy/web3-auth'
import { ethers } from 'ethers'
import SmartAccount from '@biconomy/smart-account'
import { ChainId } from '@biconomy/core-types'

export default function Auth() {
    const [smartAccount, setSmartAccount] = useState(null)
    const [interval, enableInterval] = useState(false)
    const sdkRef = useRef(null)
    const [loading, setLoading] = useState(false)
  
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
        const signature1 = await socialLoginSDK.whitelistUrl('https://biconomy-social-auth.vercel.app')
        await socialLoginSDK.init({
          chainId: ethers.utils.hexValue(ChainId.POLYGON_MAINNET),
          whitelistUrls: {
            'https://biconomy-social-auth.vercel.app': signature1,
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
          activeNetworkId: ChainId.POLYGON_MAINNET,
          supportedNetworksIds: [ChainId.POLYGON_MAINNET],
        })
        await smartAccount.init()
        setSmartAccount(smartAccount)
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
      setSmartAccount(null)
      enableInterval(false)
    }
  
    return (
      <div >
        {
          !smartAccount && !loading && <button onClick={login} className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-100'>Login</button>
        }
        {
          loading && <p>Loading account details...</p>
        }
        {
          !!smartAccount && (
            <div >
              <h3>Smart account address:</h3>
              <p>{smartAccount.address}</p>
              <button  onClick={logout}>Logout</button>
            </div>
          )
        }
      </div>
    )
  }