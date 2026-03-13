"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label='Toggle theme'
      variant='ghost'
      size='icon'
      className='cursor-pointer'
    >
      {theme === "dark" ? (
        <Sun className='size-6 text-accent' />
      ) : (
        <Moon className='size-6 text-accent' />
      )}
    </Button>
  )
}
