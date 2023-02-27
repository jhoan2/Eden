'use client'; // Error components must be Client components

import { useEffect } from 'react';
import Link from 'next/link'
export default function Error({
  error,
  reset,
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <nav aria-label="Global">
        <div className='p-2' aria-label="Global">
        <Link href="/" className="flex rounded-lg p-2 w-min text-base font-semibold leading-7 text-gray-900 ring-1 bg-emerald-300 ring-gray-900/10 hover:ring-gray-900/20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/>
          <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"/>
        </svg>
          icarus
        </Link>
        </div>
      </nav>
    <div className='flex h-screen justify-center items-center'>
      <div>
        <h2>Something went wrong!</h2>
        <button
        onClick={() => reset()}
        className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
        >
          Try again
        </button>
      </div>
    </div>
    </div>

  );
}
