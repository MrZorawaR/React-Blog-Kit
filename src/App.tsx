import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BlogsPage from '@/pages/BlogsPage'
import BlogPostPage from '@/pages/BlogPostPage'
import AdminBlogsPage from '@/pages/admin/AdminBlogsPage'
import CreateBlogPage from '@/pages/admin/CreateBlogPage'
import EditBlogPage from '@/pages/admin/EditBlogPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogPostPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/blogs" element={<AdminBlogsPage />} />
        <Route path="/admin/blogs/create" element={<CreateBlogPage />} />
        <Route path="/admin/blogs/:id/edit" element={<EditBlogPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
