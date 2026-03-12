import { Button } from "@/components/ui/button"
import { Image as ImageIcon, Option, Sparkles, Upload } from "lucide-react"

export default function Home() {
  return (
    <div className=' min-h-screen flex flex-col items-start justify-start font-sans'>
      <header className='border-b border-border /50 backdrop-blur-sm sticky top-0 z-10'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-lg bg-linear-to-br from-primary to-primary/80 flex items-center justify-center'>
              <ImageIcon className='w-6 h-6 text-primary-foreground' />
            </div>
            <div>
              <h1 className='text-xl font-bold text-foreground'>
                ID Photo Generator
              </h1>
              <p className='text-sm text-muted-foreground'>
                AI-Powered Professional Photos
              </p>
            </div>
          </div>
        </div>
      </header>
      <main className='container mx-auto px-4 py-8'>
        <div className='grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto'>
          {/* Left Panel */}
          <div className='space-y-6'>
            <div className='min-h-64 flex flex-col items-center justify-center rounded-2xl border border-border p-6 shadow-sm space-y-6'>
              <div className='p-4 bg-primary/70 text-primary-foreground rounded-full w-fit'>
                <Upload className='size-8  ' />
              </div>
              <div className='flex flex-col items-center justify-center'>
                <h2 className='text-xl font-bold'>
                  Upload Your Photo
                </h2>
                <p className='text-base text-muted-foreground'>
                  Click to browse or drag and drop your photo here
                </p>
                <p className='text-base text-muted-foreground'>
                  Supported formats: JPG, PNG, WebP (Max 10MB)
                </p>
              </div>
              <div />
            </div>

            <div className=' rounded-2xl border border-border p-6 shadow-sm space-y-6'>
              <Option />
              OptionSelector
              <div className='pt-2'>
                <Button>Generate</Button>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className='lg:sticky lg:top-24 h-fit'>
            <div className=' rounded-2xl border border-border p-6 shadow-sm min-h-[500px]'>
              <div className='p-4 bg-primary/70 text-primary-foreground rounded-full w-fit'>
                <Sparkles className='size-8  ' />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className='border-t border-border mt-16 py-8'>
        <div className='container mx-auto px-4 text-center text-sm text-muted-foreground'>
          <p>Powered by OnSpace AI • Professional ID Photos in Seconds</p>
        </div>
      </footer>
    </div>
  )
}
