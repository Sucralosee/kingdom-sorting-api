'use client';

import dynamic from 'next/dynamic'

const AppWithNoSSR = dynamic(() => import('./App'), {
  ssr: false,
})

export default function Page() {
  return <AppWithNoSSR />
}