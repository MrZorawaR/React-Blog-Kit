import { useQuery } from '@tanstack/react-query'
import { getTags } from '@/lib/blog-service'
import BlogForm from '@/components/blogs/blog-form'
import { Loader2 } from 'lucide-react'

export default function CreateBlogPage() {
  // Fetch available tags
  const { data: tags = [], isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags
  })

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="py-8 px-4">
      <BlogForm 
        availableTags={tags} 
        defaultAuthor={null}
      />
    </div>
  )
}
