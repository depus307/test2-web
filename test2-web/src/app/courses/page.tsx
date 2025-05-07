"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import MainLayout from "@/components/layout/MainLayout";
import CourseCard from "@/components/course/CourseCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import axios from "axios";

// Temporary mock data until backend is connected
const mockCategories = [
  "All",
  "Programming",
  "Design",
  "Business",
  "Marketing",
  "Personal Development",
];

export default function CoursesPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<any[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // In a real implementation, fetch courses from the database
    // For now, we'll use mock data and a simulated loading delay
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        // Simulated API call with mock data
        // In production, use: const response = await axios.get('/api/courses');
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

  // Filter courses when category or search query changes
  useEffect(() => {
    if (courses.length === 0) return;

    let filtered = [...courses];

    // Filter by category
    if (activeCategory !== "All") {
      filtered = filtered.filter(course => course.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        course =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.instructor.name.toLowerCase().includes(query)
      );
    }

    setFilteredCourses(filtered);
  }, [activeCategory, searchQuery, courses]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Explore Courses</h1>
            <p className="text-muted-foreground">
              Browse our collection of high-quality educational videos
            </p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category tabs */}
        <Tabs defaultValue="All" className="mb-8">
          <TabsList className="flex overflow-x-auto pb-2 space-x-2">
            {mockCategories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => handleCategoryChange(category)}
                className="px-4 py-2"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Course grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
            <Button onClick={() => {
              setSearchQuery("");
              setActiveCategory("All");
            }}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
} 