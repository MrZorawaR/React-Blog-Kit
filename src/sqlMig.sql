create table public.categories (
  id uuid not null default gen_random_uuid (),
  name text not null,
  slug text not null,
  description text null,
  created_at timestamp with time zone null default timezone ('utc'::text, now()),
  constraint categories_pkey primary key (id),
  constraint categories_slug_key unique (slug)
) TABLESPACE pg_default;

create table public.profiles (
  id uuid not null,
  full_name text null,
  avatar_url text null,
  created_at timestamp with time zone null default timezone ('utc'::text, now()),
  constraint profiles_pkey primary key (id),
  constraint profiles_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;


create table public.blogs (
  id uuid not null default gen_random_uuid(),
  title text not null,
  slug text not null,
  excerpt text,
  content text,
  image_url text,
  tags text[] default '{}'::text[],
  faqs jsonb default '[]'::jsonb,
  is_featured boolean default false,
  is_published boolean default true,
  created_at timestamptz not null default timezone('utc', now()),
  category_id uuid,
  meta_title text,
  meta_description text,
  keywords text[],
  robots text default 'index, follow',
  canonical_url text,
  og_title text,
  og_description text,
  og_image_url text,
  author_id uuid,
  enable_structured_data boolean default true,

  constraint blogs_pkey primary key (id),
  constraint blogs_slug_key unique (slug),
  constraint blogs_author_id_fkey foreign key (author_id)
    references public.profiles (id) on delete set null,
  constraint blogs_category_id_fkey foreign key (category_id)
    references public.categories (id) on delete set null
);

