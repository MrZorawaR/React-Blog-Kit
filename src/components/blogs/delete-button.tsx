import { Trash2 } from 'lucide-react'
import { deleteBlog } from '@/lib/blog-service'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export default function DeleteBlogButton({ blogId }: { blogId: string }) {
  const queryClient = useQueryClient()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!confirm('Are you sure you want to delete this blog?')) return

    setIsDeleting(true)
    try {
      await deleteBlog(blogId)
      toast.success('Blog deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    } catch {
      toast.error('Failed to delete blog')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <form onSubmit={handleDelete}>
      <button 
        type="submit" 
        disabled={isDeleting}
        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
        title="Delete Blog"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </form>
  )
}
