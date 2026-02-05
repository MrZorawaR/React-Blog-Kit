import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl?: string
  search?: string
  tag?: string
}

export function Pagination({ currentPage, totalPages, search = '', tag = '' }: PaginationProps) {
  const buildUrl = (page: number) => {
    const params = new URLSearchParams()
    params.set('page', page.toString())
    if (search) params.set('search', search)
    if (tag) params.set('tag', tag)
    return `?${params.toString()}#all-articles`
  }

  return (
    <nav className="flex justify-center" aria-label="Pagination">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            to={buildUrl(Math.max(1, currentPage - 1))} 
            disabled={currentPage === 1}
          />
        </PaginationItem>
        
        {Array.from({ length: totalPages }).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink 
              to={buildUrl(i + 1)}
              isActive={currentPage === i + 1}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext 
            to={buildUrl(Math.min(totalPages, currentPage + 1))} 
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </nav>
  )
}

export function PaginationContent({ children }: { children: React.ReactNode }) {
  return (
    <ul className="flex flex-row items-center gap-1">
      {children}
    </ul>
  )
}

export function PaginationItem({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>
}

interface PaginationLinkProps {
  to: string
  isActive?: boolean
  children: React.ReactNode
}

export function PaginationLink({ to, isActive, children }: PaginationLinkProps) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10 ${
        isActive 
          ? 'bg-black text-white hover:bg-gray-800' 
          : 'bg-white border border-gray-200 hover:bg-gray-50'
      }`}
    >
      {children}
    </Link>
  )
}

interface PaginationNavProps {
  to: string
  disabled?: boolean
}

export function PaginationPrevious({ to, disabled }: PaginationNavProps) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 h-10 px-4 py-2 gap-1 ${
        disabled 
          ? 'pointer-events-none opacity-50' 
          : 'bg-white border border-gray-200 hover:bg-gray-50'
      }`}
      aria-disabled={disabled}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>Previous</span>
    </Link>
  )
}

export function PaginationNext({ to, disabled }: PaginationNavProps) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 h-10 px-4 py-2 gap-1 ${
        disabled 
          ? 'pointer-events-none opacity-50' 
          : 'bg-white border border-gray-200 hover:bg-gray-50'
      }`}
      aria-disabled={disabled}
    >
      <span>Next</span>
      <ChevronRight className="h-4 w-4" />
    </Link>
  )
}

export function PaginationEllipsis() {
  return (
    <span className="flex h-9 w-9 items-center justify-center">
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}
