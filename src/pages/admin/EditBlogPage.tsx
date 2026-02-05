import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import { getTags, getBlogById } from '@/lib/blog-service'
import BlogForm from '@/components/blogs/blog-form'
import { Loader2 } from 'lucide-react'

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>()

  // 1. Fetch Blog
  const { data: blog, isLoading: blogLoading, error } = useQuery({
    queryKey: ['blog', 'edit', id],
    queryFn: () => getBlogById(id!),
    enabled: !!id
  })

  // 2. Fetch Available Tags
  const { data: tags = [], isLoading: tagsLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags
  })

  const isLoading = blogLoading || tagsLoading

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Blog not found</h1>
        <Link to="/admin/blogs" className="text-blue-600 hover:underline">← Back to blogs</Link>
      </div>
    )
  }

  return (
    <div className="py-8 px-4">
      <BlogForm 
        blog={blog} 
        availableTags={tags}
        defaultAuthor={null}
      />
    </div>
  )
}
