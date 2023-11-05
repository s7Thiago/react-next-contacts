import { List } from '@/components/Index'
import { HomeForm } from './HomeForm/page'

export default function Home() {
  return (
    <main className={`
      flex
      transition-all
      duration-500
      min-h-screen
      flex-row
      items-center
      justify-center
      p-24
      bg-[#f4f4f4]
    `}>

      <HomeForm/>
      <List/>

    </main>
  )
}
