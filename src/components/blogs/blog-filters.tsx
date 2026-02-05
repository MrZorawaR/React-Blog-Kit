import { Search } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce"; 

const AVAILABLE_TAGS = [
  "Physics", "History", "Business Studies", "Geography", "Biology", 
  "Chemistry", "Domain Subjects", "Universities", "Class 12 Boards", 
  "Students", "Syllabus", "Counselling", "English", "Mathematics", 
  "GK and Current Affairs", "Agriculture", "Strategic Guide", 
  "Entrepreneurship", "General Test", "Computer Challenge"
];

export default function BlogFilters() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentSearch = searchParams.get("search") || "";

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) params.set("search", term);
    else params.delete("search");
    params.set("page", "1");
    navigate(`?${params.toString()}`, { replace: true });
  }, 300);

  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input 
        type="text"
        defaultValue={currentSearch}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search topics"
        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
      />
    </div>
  );
}

export function BlogTags({ activeTag }: { activeTag?: string }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    if (activeTag === tag) params.delete("tag");
    else params.set("tag", tag);
    params.set("page", "1");
    navigate(`?${params.toString()}`, { replace: true });
  };

  return (
    <div className="flex flex-wrap gap-3">
      {AVAILABLE_TAGS.map(tag => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all border ${
            activeTag === tag 
              ? "bg-blue-600 text-white border-blue-600" 
              : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
          }`}
        >
          {tag}
        </button>
      ))}
      <button 
        onClick={() => {
            const params = new URLSearchParams(searchParams);
            params.delete("tag");
            navigate(`?${params.toString()}`, { replace: true });
        }}
        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all border ${
            !activeTag ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
        }`}
      >
        All Categories
      </button>
    </div>
  );
}
