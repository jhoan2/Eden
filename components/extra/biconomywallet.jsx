'use client'

import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import useIsMounted from '../hooks/useIsMounted'
import CreateTableButton from '../components/CreateTableButton'
import "@biconomy/web3-auth/dist/src/style.css"
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useNoteStore } from '../components/store';
import { Database } from "@tableland/sdk";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [returningUser, setReturningUser] = useState(false);
  const isMounted = useIsMounted();
  const smartAccountAddress = useNoteStore((state) => state.smartAccountAddress);
  const userTableName = useNoteStore((state) => state.user.owned_table);
  const userID = useNoteStore((state) => state.user.id);
  const updateUser = useNoteStore((state) => state.updateUser);

  const SocialLoginDynamic = dynamic(
    () => import("../components/Auth").then((res) => res.default),
    {
      ssr: false,
    }
  );
  
  const fetchReturningUser = async (smartAccountAddress) => {
    const db = Database.readOnly("maticmum");
    const { results } = await db.prepare(`SELECT * FROM icarus_80001_5937 WHERE pub_address='${smartAccountAddress}';`).all();
    return results
  }

  useEffect(() => {
    if (smartAccountAddress) {
      try {
        fetchReturningUser(smartAccountAddress).then((result) => {
          if (result[0]?.pub_address === smartAccountAddress) {
            setReturningUser(true)
            updateUser(result[0])
          }
        })
      } catch (err) {
        console.log({message: err})
      }
    }

  }, [smartAccountAddress, userTableName])

  return (
    <div className="isolate bg-white">
    <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
      <svg
        className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
        viewBox="0 0 1155 678"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
          fillOpacity=".3"
          d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
        />
        <defs>
          <linearGradient
            id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
            x1="1155.49"
            x2="-78.208"
            y1=".177"
            y2="474.645"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#34d399" />
            <stop offset={1} stopColor="#a3e635" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div className="px-6 pt-6 lg:px-8">
      <div>
        <nav className="flex h-9 items-center justify-between" aria-label="Global">
          <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">icarus</h2>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
              {isMounted ? 
              <div>
                <Suspense fallback={<div>Loading...</div>}>
                  <SocialLoginDynamic />
                </Suspense>
                <ToastContainer 
                  position="top-center"
                  hideProgressBar
                  newestOnTop={true}
                  theme="colored"
                />
              </div>

                : null
              }
          </div>
        </nav>
        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <Dialog.Panel focus="true" className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
            <div className="flex h-9 items-center justify-between">
              <div className="flex">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">icarus | Note taking app</span>
                  <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">EDEN</h2>
                </a>
              </div>
              <div className="flex">
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6">
                {isMounted ? 
                <Suspense fallback={<div>Loading...</div>}>
                  <SocialLoginDynamic />
                </Suspense>
                : null
                }
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
    </div>
    <main>
      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
          <div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
                Note taking app to grow your digital garden
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
                Cultivate organized thoughts and never let your ideas wither away with our app. Grow and nurture your ideas together with our collaborative note taking app.
                Connect your wallet to get started. 
              </p>
              
              {smartAccountAddress ?
                <div>
                  {returningUser ? 
                  <div className="mt-8 flex gap-x-4 sm:justify-center">
                  <Link 
                  href={`/user/${userID}`}
                  className="inline-block rounded-lg bg-emerald-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-emerald-600 hover:bg-emerald-700 hover:ring-emerald-700"
                  >
                    Launch App
                    <span className="text-emerald-200" aria-hidden="true">
                      &rarr;
                    </span>
                  </Link>              
                </div> :
                <div className="mt-8 flex gap-x-4 sm:justify-center">
                  <CreateTableButton /> 
                </div>
                  }
                </div> :
                null
              }
            </div>
            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
              <svg
                className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                viewBox="0 0 1155 678"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                  fillOpacity=".3"
                  d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                />
                <defs>
                  <linearGradient
                    id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                    x1="1155.49"
                    x2="-78.208"
                    y1=".177"
                    y2="474.645"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#34d399" />
                    <stop offset={1} stopColor="#a3e635" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </main>
    </div>
  );
}
