import { useState, createContext, useContext, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface AccordionContextValue {
  type: 'single' | 'multiple'
  collapsible: boolean
  openItems: string[]
  toggleItem: (value: string) => void
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

interface AccordionProps {
  type?: 'single' | 'multiple'
  collapsible?: boolean
  className?: string
  children: ReactNode
}

export function Accordion({ 
  type = 'single', 
  collapsible = false, 
  className = '', 
  children 
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (value: string) => {
    if (type === 'single') {
      if (openItems.includes(value) && collapsible) {
        setOpenItems([])
      } else {
        setOpenItems([value])
      }
    } else {
      if (openItems.includes(value)) {
        setOpenItems(openItems.filter(item => item !== value))
      } else {
        setOpenItems([...openItems, value])
      }
    }
  }

  return (
    <AccordionContext.Provider value={{ type, collapsible, openItems, toggleItem }}>
      <div className={className}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps {
  value: string
  className?: string
  children: ReactNode
}

export function AccordionItem({ value, className = '', children }: AccordionItemProps) {
  return (
    <div className={className} data-value={value}>
      {children}
    </div>
  )
}

interface AccordionTriggerProps {
  className?: string
  children: ReactNode
}

export function AccordionTrigger({ className = '', children }: AccordionTriggerProps) {
  const context = useContext(AccordionContext)
  
  // Get parent AccordionItem's value
  const getParentValue = (element: HTMLElement | null): string => {
    if (!element) return ''
    const parent = element.closest('[data-value]')
    return parent?.getAttribute('data-value') || ''
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = getParentValue(e.currentTarget)
    if (value && context) {
      context.toggleItem(value)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex flex-1 items-center justify-between text-sm font-medium transition-all [&[data-state=open]>svg]:rotate-180 w-full ${className}`}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200" />
    </button>
  )
}

interface AccordionContentProps {
  className?: string
  children: ReactNode
}

export function AccordionContent({ className = '', children }: AccordionContentProps) {
  const context = useContext(AccordionContext)
  
  // Get parent AccordionItem's value
  const getParentValue = (element: HTMLElement | null): string => {
    if (!element) return ''
    const parent = element.closest('[data-value]')
    return parent?.getAttribute('data-value') || ''
  }

  // Use a ref to check if this content should be visible
  const [isOpen, setIsOpen] = useState(false)
  const [parentValue, setParentValue] = useState('')

  // Check visibility based on context
  const checkVisibility = (element: HTMLDivElement | null) => {
    if (element && context) {
      const value = getParentValue(element)
      setParentValue(value)
      setIsOpen(context.openItems.includes(value))
    }
  }

  // Re-check when openItems changes
  if (context && parentValue && context.openItems.includes(parentValue) !== isOpen) {
    setIsOpen(context.openItems.includes(parentValue))
  }

  return (
    <div 
      ref={checkVisibility}
      className={`overflow-hidden text-sm transition-all ${isOpen ? 'animate-accordion-down' : 'hidden'} ${className}`}
    >
      <div className="pt-0">
        {children}
      </div>
    </div>
  )
}
