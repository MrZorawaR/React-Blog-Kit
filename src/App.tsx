import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BlogsPage from '@/pages/BlogsPage'
import BlogPostPage from '@/pages/BlogPostPage'
import LoginPage from '@/pages/LoginPage'
import AdminBlogsPage from '@/pages/admin/AdminBlogsPage'
import CreateBlogPage from '@/pages/admin/CreateBlogPage'
import EditBlogPage from '@/pages/admin/EditBlogPage'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogPostPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/blogs" element={<AdminBlogsPage />} />
          <Route path="/admin/blogs/create" element={<CreateBlogPage />} />
          <Route path="/admin/blogs/:id/edit" element={<EditBlogPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
