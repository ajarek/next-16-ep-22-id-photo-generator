"use client"

import { GenerateButton } from "@/components/ui/GenerateButton"
import { OptionSelector } from "@/components/ui/OptionSelector"
import { UploadSection } from "@/components/ui/UploadSection"
import { Image as ImageIcon, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import { PhotoOptions, BodyType, BackgroundColor, AspectRatio } from "@/types"
import { ResultDisplay } from "@/components/ui/ResultDisplayProps"
import { processIdPhoto } from "@/lib/imageProcessor"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ModeToggle"
import { toast } from "sonner"

const BODY_TYPES: readonly BodyType[] = ["full", "half"]
const BACKGROUND_COLORS: readonly BackgroundColor[] = ["white", "gray", "blue"]
const ASPECT_RATIOS: readonly AspectRatio[] = ["3:4", "4:3"]
const BODY_TYPE_NAMES: Record<BodyType, string> = {
  full: "Full-body photo",
  half: "Half-body photo",
}
const BACKGROUND_COLOR_NAMES: Record<BackgroundColor, string> = {
  white: "White",
  gray: "Gray",
  blue: "Blue",
}

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [history, setHistory] = useState<string[]>([])

  const [options, setOptions] = useState<PhotoOptions>({
    bodyType: "half",
    backgroundColor: "white",
    aspectRatio: "3:4",
  })

  useEffect(() => {
    const saved = localStorage.getItem("id-photos-history")
    if (saved) {
      try {
        setHistory(JSON.parse(saved))
      } catch {
        toast.error("Failed to load history")
      }
    }
  }, [])

  useEffect(() => {
    if (history.length === 0) {
      localStorage.removeItem("id-photos-history")
    }
  }, [history])
  const handleImageUpload = (image: string) => {
    setUploadedImage(image)
    toast.success("Photo uploaded", { description: "Your photo is ready to process." })
  }

  const handleImageRemove = () => {
    setUploadedImage(null)
    setGeneratedImage(null)
    toast.info("Photo removed")
  }
  const handleGenerate = async () => {
    if (!uploadedImage) return
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const resultDataUrl = await processIdPhoto(uploadedImage, options)
      setGeneratedImage(resultDataUrl)
      setHistory((prev) => {
        const newHistory = [resultDataUrl, ...prev].slice(0, 6)
        localStorage.setItem("id-photos-history", JSON.stringify(newHistory))
        return newHistory
      })
      toast.success("ID Photo generated!", { description: "Your photo is ready to download." })
    } catch (error) {
      toast.error("Generation failed", { description: error instanceof Error ? error.message : "Something went wrong." })
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className=' min-h-screen flex flex-col items-start justify-start font-sans'>
      <header className='w-full flex items-center justify-between container mx-auto px-4 py-4 border-b border-border /50 backdrop-blur-sm sticky top-0 z-10'>
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
        <ModeToggle />
      </header>

      <main className='container mx-auto px-4 py-8'>
        <div className='grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto'>
          <div className='space-y-6'>
            <div className='min-h-64 flex flex-col items-center justify-center rounded-2xl border border-border p-6 shadow-sm space-y-6'>
              <UploadSection
                uploadedImage={uploadedImage}
                onImageUpload={handleImageUpload}
                onImageRemove={handleImageRemove}
              />
              <div />
            </div>

            <div className=' rounded-2xl border border-border p-6 shadow-sm space-y-6'>
              <OptionSelector
                label='Photo Type'
                options={BODY_TYPES}
                selectedOption={options.bodyType}
                onSelect={(bodyType) => setOptions({ ...options, bodyType })}
                displayNames={BODY_TYPE_NAMES}
              />

              <OptionSelector
                label='Background Color'
                options={BACKGROUND_COLORS}
                selectedOption={options.backgroundColor}
                onSelect={(backgroundColor) =>
                  setOptions({ ...options, backgroundColor })
                }
                displayNames={BACKGROUND_COLOR_NAMES}
              />

              <OptionSelector
                label='Aspect Ratio'
                options={ASPECT_RATIOS}
                selectedOption={options.aspectRatio}
                onSelect={(aspectRatio) =>
                  setOptions({ ...options, aspectRatio })
                }
              />

              <div className='pt-2'>
                <GenerateButton
                  onClick={handleGenerate}
                  disabled={!uploadedImage}
                  loading={loading}
                />
              </div>
            </div>
          </div>

          <div className='lg:sticky lg:top-24 h-fit'>
            <div className=' rounded-2xl border border-border p-6 shadow-sm min-h-[500px]'>
              <ResultDisplay
                generatedImage={generatedImage}
                loading={loading}
                onClear={() => setGeneratedImage(null)}
              />
            </div>
          </div>
        </div>
      </main>

      {history.length > 0 && (
        <section className='container mx-auto px-4 py-8 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-bold mb-6 text-foreground'>
              Your Recent Generations
            </h2>
            <Button
              variant='destructive'
              onClick={() => {
                setHistory([])
                toast.info("History cleared")
              }}
              className='cursor-pointer'
            >
             <Trash2 className="mr-2 h-4 w-4" /> Clear History
            </Button>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {history.map((imStr, i) => (
              <div
                key={i}
                className='rounded-xl overflow-hidden border border-border aspect-3/4 cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-primary transition-all relative group'
                onClick={() => setGeneratedImage(imStr)}
              >
                <Image
                  src={imStr}
                  alt={`Generated ID ${i}`}
                  width={500}
                  height={500}
                  className='w-full h-full object-cover'
                />
                <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium text-sm text-center p-2'>
                  Click to View
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer className='border-t border-border mt-16 py-8'>
        <div className='container mx-auto px-4 text-center text-sm text-muted-foreground'>
          <p>Professional ID Photos in Seconds</p>
        </div>
      </footer>
    </div>
  )
}
