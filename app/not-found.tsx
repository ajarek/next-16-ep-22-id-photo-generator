import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className='h-[calc(100vh-64px)] w-full mx-auto  container flex flex-col items-center justify-center'>
      <div className='w-full flex flex-col items-center text-center gap-6'>
        <h1 className='text-4xl font-serif text-primary mt-4'>
          Strona nie znaleziona!
        </h1>

        <p className='max-w-lg  text-lg px-4'>
          Strona, której próbujesz się dostać, nie jest dostępna lub adres jest
          niepoprawny. Spróbuj przejść na stronę główną lub sprawdź poprawność
          adresu URL.
        </p>

        <div className='flex gap-3'>
          <Link href='/'>
            <Button className='rounded-xl  cursor-pointer'>
              Strona główna
            </Button>
          </Link>
        </div>

        <p className=''>Kod błędu: <span className="text-primary text-2xl">404</span></p>
      </div>
    </main>
  )
}
