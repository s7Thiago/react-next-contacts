import Image from 'next/image'
import { HomeForm } from './HomeForm/HomeForm'
import { Animated } from './HomeForm/components/Animated'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <HomeForm />
    <Animated />

    </main>
  )
}
