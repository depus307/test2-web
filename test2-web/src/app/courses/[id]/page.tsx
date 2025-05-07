"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import MainLayout from "@/components/layout/MainLayout";
import VideoPlayer from "@/components/course/VideoPlayer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDuration } from "@/lib/utils";
import { motion } from "framer-motion";
import { BookOpen, Clock, Star, User, Heart, HeartOff } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";

export default function CourseDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<any>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        // In a real implementation, fetch course from the database
        // For now, we'll use mock data
        // const response = await axios.get(`/api/courses/${id}`);
        
        setTimeout(() => {
          const mockCourse = {
            id: "1",
            title: "Introduction to Web Development",
            description: "Learn the fundamentals of web development with HTML, CSS, and JavaScript. This comprehensive course will take you from beginner to advanced concepts in web development. You'll build real projects, learn best practices, and gain the skills needed to create responsive and interactive websites.",
            thumbnailUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166",
            category: "Programming",
            instructor: {
              name: "John Smith",
              bio: "Senior Web Developer with 10+ years of experience teaching coding to beginners",
              avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            isFeatured: true,
            requiresPromoCode: true,
            videos: [
              {
                id: "v1",
                title: "Introduction to HTML",
                description: "In this lesson, we'll cover the basics of HTML, the building block of the web.",
                videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                thumbnailUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713",
                duration: 1200, // 20 minutes
                order: 1,
              },
              {
                id: "v2",
                title: "CSS Fundamentals",
                description: "Learn how to style your HTML with CSS to create beautiful websites.",
                videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                thumbnailUrl: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2",
                duration: 1800, // 30 minutes
                order: 2,
              },
              {
                id: "v3",
                title: "JavaScript Basics",
                description: "Get started with JavaScript and learn how to make your websites interactive.",
                videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                thumbnailUrl: "https://images.unsplash.com/photo-1555099962-4199c345e5dd",
                duration: 2400, // 40 minutes
                order: 3,
              },
            ],
          };
          
          setCourse(mockCourse);
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching course:", error);
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  const toggleFavorite = async () => {
    try {
      setIsFavorite(!isFavorite);
      toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
      
      // In a real implementation, call API to update favorites
      // await axios.post('/api/user/favorites', { courseId: id });
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorites");
      setIsFavorite(!isFavorite); // Revert on error
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="space-y-6">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-96 w-full rounded-lg" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Skeleton className="h-12 w-full mb-4" />
                <Skeleton className="h-32 w-full" />
              </div>
              <div>
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!course) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find the course you're looking for.
          </p>
          <Button asChild>
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const activeVideo = course.videos[activeVideoIndex];
  const totalDuration = course.videos.reduce((total: number, video: any) => total + video.duration, 0);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="outline">{course.category}</Badge>
                {course.isFeatured && (
                  <Badge variant="secondary" className="bg-primary text-white">
                    <Star className="h-3 w-3 mr-1" /> Featured
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-4 mb-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {course.instructor.name}
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {course.videos.length} {course.videos.length === 1 ? "lesson" : "lessons"}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatDuration(totalDuration)}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFavorite}
                  className="text-muted-foreground"
                >
                  {isFavorite ? (
                    <>
                      <HeartOff className="h-4 w-4 mr-1" /> Remove from favorites
                    </>
                  ) : (
                    <>
                      <Heart className="h-4 w-4 mr-1" /> Add to favorites
                    </>
                  )}
                </Button>
              </div>
            </motion.div>

            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <VideoPlayer
                videoUrl={activeVideo.videoUrl}
                thumbnailUrl={activeVideo.thumbnailUrl}
                title={activeVideo.title}
              />
            </motion.div>

            {/* Tabs for Course Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
                  <TabsTrigger value="instructor" className="flex-1">Instructor</TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="space-y-4">
                  <h2 className="text-xl font-semibold">About this course</h2>
                  <p className="text-muted-foreground">{course.description}</p>
                </TabsContent>
                <TabsContent value="instructor">
                  <div className="flex items-start gap-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden bg-muted">
                      {course.instructor.avatarUrl && (
                        <img
                          src={course.instructor.avatarUrl}
                          alt={course.instructor.name}
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{course.instructor.name}</h2>
                      <p className="text-muted-foreground mt-2">{course.instructor.bio}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Sidebar - Course Content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
                <CardContent className="p-0">
                  <div className="p-4 border-b border-border">
                    <h2 className="text-lg font-semibold">Course Content</h2>
                    <div className="flex items-center text-sm text-muted-foreground gap-2 mt-1">
                      <span>{course.videos.length} lessons</span>
                      <span>•</span>
                      <span>{formatDuration(totalDuration)} total</span>
                    </div>
                  </div>
                  <div className="divide-y divide-border">
                    {course.videos.map((video: any, index: number) => (
                      <button
                        key={video.id}
                        onClick={() => setActiveVideoIndex(index)}
                        className={`w-full text-left p-4 hover:bg-muted/50 transition-colors ${
                          index === activeVideoIndex ? "bg-muted" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-none w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs">{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{video.title}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{formatDuration(video.duration)}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 