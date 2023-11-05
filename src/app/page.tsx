import Image from 'next/image'
import { HomeForm } from './HomeForm/page'
import { Animated } from './HomeForm/components/Animated'
import { Button } from '@/components/Index'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <HomeForm />
    <Animated />

    </main>
  )
}
