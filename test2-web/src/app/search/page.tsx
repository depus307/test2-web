"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import CourseCard from "@/components/course/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Search, Filter, BookOpen, X } from "lucide-react";

// Temporary mock data until backend is connected
const mockCategories = [
  "Programming",
  "Design",
  "Business",
  "Marketing",
  "Personal Development",
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<any[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    // In a real implementation, fetch courses based on the search query
    // For now, we'll use mock data and a simulated loading delay
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        
        setTimeout(() => {
          const mockCourses = [
            {
              id: "1",
              title: "Introduction to Web Development",
              description: "Learn the fundamentals of web development with HTML, CSS, and JavaScript.",
              thumbnailUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166",
              category: "Programming",
              instructor: { name: "John Smith" },
              videosCount: 12,
              totalDuration: 5400, // in seconds (1h 30m)
              isFeatured: true,
              requiresPromoCode: true,
            },
            {
              id: "2",
              title: "UI/UX Design Principles",
              description: "Master the principles of great user interface and experience design.",
              thumbnailUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
              category: "Design",
              instructor: { name: "Sarah Johnson" },
              videosCount: 8,
              totalDuration: 3600, // in seconds (1h)
              isFeatured: false,
              requiresPromoCode: true,
            },
            {
              id: "3",
              title: "Business Strategy Fundamentals",
              description: "Learn how to develop effective business strategies for growth and success.",
              thumbnailUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
              category: "Business",
              instructor: { name: "Michael Brown" },
              videosCount: 10,
              totalDuration: 4800, // in seconds (1h 20m)
              isFeatured: false,
              requiresPromoCode: true,
            },
            {
              id: "4",
              title: "Advanced JavaScript Techniques",
              description: "Take your JavaScript skills to the next level with advanced techniques and patterns.",
              thumbnailUrl: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a",
              category: "Programming",
              instructor: { name: "Alex Chen" },
              videosCount: 15,
              totalDuration: 7200, // in seconds (2h)
              isFeatured: true,
              requiresPromoCode: true,
            },
          ];
          
          setCourses(mockCourses);
          setFilteredCourses(mockCourses);
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Apply filters when search query or categories change
  useEffect(() => {
    if (courses.length === 0) return;

    let filtered = [...courses];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        course =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.instructor.name.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query)
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(course => 
        selectedCategories.includes(course.category)
      );
    }

    setFilteredCourses(filtered);
  }, [searchQuery, selectedCategories, courses]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you might want to update the URL here
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery("");
  };

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Search Courses</h1>
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for courses, topics, or instructors..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
            <Button
              type="button"
              variant="outline"
              onClick={toggleFilters}
              className="md:hidden"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <motion.div
            className={`md:block ${isFiltersOpen ? "block" : "hidden"}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Filters</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    disabled={selectedCategories.length === 0 && !searchQuery}
                  >
                    <X className="h-4 w-4 mr-1" /> Clear
                  </Button>
                </div>
                <CardDescription>Refine your search results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {mockCategories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <div className="md:col-span-3">
            {/* Results Summary */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                {isLoading
                  ? "Searching..."
                  : `Found ${filteredCourses.length} ${
                      filteredCourses.length === 1 ? "course" : "courses"
                    }`}
              </p>
              {selectedCategories.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Filtered by:</span>
                  {selectedCategories.map(category => (
                    <Button
                      key={category}
                      variant="outline"
                      size="sm"
                      onClick={() => toggleCategory(category)}
                      className="h-7 px-2 text-xs"
                    >
                      {category} <X className="h-3 w-3 ml-1" />
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Course Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="space-y-3">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredCourses.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {filteredCourses.map((course, index) => (
                  <CourseCard key={course.id} {...course} index={index} />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any courses matching your criteria.
                </p>
                <Button onClick={clearFilters}>Clear filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 