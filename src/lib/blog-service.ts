import { supabase } from './supabase'

// Helper to parse comma-separated tags
function parseTags(tagString: string | null): string[] {
  if (!tagString) return []
  return tagString.split(',').map(t => t.trim()).filter(t => t.length > 0)
}

// Helper to upload file and return URL
export async function uploadImage(file: File, bucket: string = 'blog-images'): Promise<string | null> {
  if (!file || file.size === 0) return null

  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  const filePath = `${fileName}`

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file)

  if (error) {
    console.error(`Upload failed: ${error.message}`)
    return null
  }

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath)

  return data.publicUrl
}

// Get paginated blogs with optional search and tag filter
export async function getBlogs(params: {
  page?: number
  search?: string
  tag?: string
  itemsPerPage?: number
  isFeatured?: boolean
}) {
  const { page = 1, search = '', tag = '', itemsPerPage = 6, isFeatured = false } = params
  
  let query = supabase
    .from('blogs')
    .select('*', { count: 'exact' })
    .eq('is_featured', isFeatured)
    .order('created_at', { ascending: false })

  if (search) query = query.ilike('title', `%${search}%`)
  if (tag) query = query.contains('tags', [tag])

  const from = (page - 1) * itemsPerPage
  const to = from + itemsPerPage - 1

  const { data, count, error } = await query.range(from, to)
  
  if (error) throw error
  
  return { blogs: data || [], count: count || 0, totalPages: count ? Math.ceil(count / itemsPerPage) : 0 }
}

// Get featured blogs
export async function getFeaturedBlogs(limit: number = 2) {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('is_featured', true)
    .limit(limit)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

// Get all blogs for admin (no pagination filter)
export async function getAllBlogs() {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

// Get single blog by slug
export async function getBlogBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

// Get single blog by ID
export async function getBlogById(id: string) {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

// Get related blogs (excluding current one)
export async function getRelatedBlogs(excludeId: string, limit: number = 4) {
  const { data, error } = await supabase
    .from('blogs')
    .select('id, title, slug, image_url, created_at')
    .neq('id', excludeId)
    .limit(limit)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

// Hardcoded available tags (same as BlogTags component)
const AVAILABLE_TAGS = [
  "Physics", "History", "Business Studies", "Geography", "Biology", 
  "Chemistry", "Domain Subjects", "Universities", "Class 12 Boards", 
  "Students", "Syllabus", "Counselling", "English", "Mathematics", 
  "GK and Current Affairs", "Agriculture", "Strategic Guide", 
  "Entrepreneurship", "General Test", "Computer Challenge"
]

// Get available tags
export async function getTags() {
  try {
    const { data, error } = await supabase
      .from('tags')
      .select('name')
      .order('name')

    if (error) {
      // If tags table doesn't exist, use hardcoded tags
      return AVAILABLE_TAGS
    }
    return data?.map(t => t.name) || AVAILABLE_TAGS
  } catch {
    // If tags table doesn't exist, use hardcoded tags
    return AVAILABLE_TAGS
  }
}

// Create blog
export async function createBlog(formData: FormData) {
  // Basic Info
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('content') as string
  const category_id = formData.get('category_id') as string
  const tags = parseTags(formData.get('tags') as string)
  const is_featured = formData.get('is_featured') === 'on'
  const is_published = formData.get('is_published') === 'on'

  // SEO & Meta
  const meta_title = formData.get('meta_title') as string
  const meta_description = formData.get('meta_description') as string
  const keywords = parseTags(formData.get('keywords') as string)
  const robots = formData.get('robots') as string
  const canonical_url = formData.get('canonical_url') as string
  
  // Social Media
  const og_title = formData.get('og_title') as string
  const og_description = formData.get('og_description') as string
  
  // Author & Settings
  const author_id = formData.get('author_id') as string
  const enable_structured_data = formData.get('enable_structured_data') === 'on'

  // Image Uploads
  const imageFile = formData.get('image_file') as File
  const ogImageFile = formData.get('og_image_file') as File
  
  let image_url = await uploadImage(imageFile)
  const og_image_url = await uploadImage(ogImageFile)

  // Default placeholder
  if (!image_url) {
    image_url = 'https://images.unsplash.com/photo-1499750310159-5b5f226932b7?auto=format&fit=crop&w=800&q=80' 
  }

  const { error } = await supabase.from('blogs').insert({
    title, slug, content, category_id, tags, is_featured, is_published,
    image_url,
    // SEO Fields
    meta_title, meta_description, keywords, robots, canonical_url,
    // OG Fields
    og_title, og_description, og_image_url,
    // Author
    author_id: author_id || null,
    enable_structured_data
  })

  if (error) throw new Error(error.message)
  return { success: true }
}

// Update blog
export async function updateBlog(formData: FormData) {
  const id = formData.get('id') as string
  
  // Basic Info
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('content') as string
  const category_id = formData.get('category_id') as string
  const tags = parseTags(formData.get('tags') as string)
  const is_featured = formData.get('is_featured') === 'on'
  const is_published = formData.get('is_published') === 'on'

  // SEO & Meta
  const meta_title = formData.get('meta_title') as string
  const meta_description = formData.get('meta_description') as string
  const keywords = parseTags(formData.get('keywords') as string)
  const robots = formData.get('robots') as string
  const canonical_url = formData.get('canonical_url') as string
  
  // Social Media
  const og_title = formData.get('og_title') as string
  const og_description = formData.get('og_description') as string
  
  // Author & Settings
  const author_id = formData.get('author_id') as string
  const enable_structured_data = formData.get('enable_structured_data') === 'on'

  // Handle Image Uploads
  const imageFile = formData.get('image_file') as File
  const ogImageFile = formData.get('og_image_file') as File
  
  const newImageUrl = await uploadImage(imageFile)
  const newOgImageUrl = await uploadImage(ogImageFile)

  const updateData: Record<string, unknown> = {
    title, slug, content, category_id, tags, is_featured, is_published,
    meta_title, meta_description, keywords, robots, canonical_url,
    og_title, og_description,
    author_id: author_id || null,
    enable_structured_data,
    updated_at: new Date().toISOString()
  }

  if (newImageUrl) updateData.image_url = newImageUrl
  if (newOgImageUrl) updateData.og_image_url = newOgImageUrl

  const { error } = await supabase.from('blogs').update(updateData).eq('id', id)

  if (error) throw new Error(error.message)
  return { success: true }
}

// Delete blog
export async function deleteBlog(id: string) {
  const { error } = await supabase.from('blogs').delete().eq('id', id)
  if (error) throw new Error(error.message)
  return { success: true }
}
