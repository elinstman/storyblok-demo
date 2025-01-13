import { createContext, useContext } from 'react'
import { StoryblokCMS } from "../utils/cms"

interface StoryblokContextType {
  storyblok: StoryblokCMS
}

const StoryblokContext = createContext<StoryblokContextType | undefined>(undefined)

export function useStoryblok() {
  const context = useContext(StoryblokContext)
  if (!context) {
    throw new Error('useStoryblok must be used within a StoryblokProvider')
  }
  return context.storyblok
}

export function StoryblokProvider({ 
  children, 
  storyblok 
}: { 
  children: React.ReactNode
  storyblok: StoryblokCMS 
}) {
  return (
    <StoryblokContext.Provider value={{ storyblok }}>
      {children}
    </StoryblokContext.Provider>
  )
}
