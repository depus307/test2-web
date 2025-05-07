"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import MainLayout from "@/components/layout/MainLayout";
import CourseCard from "@/components/course/CourseCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { BookOpen, Heart, Clock, Settings, User, LogOut } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteVideos, setFavoriteVideos] = useState<any[]>([]);
  const [savedCourses, setSavedCourses] = useState<any[]>([]);

  useEffect(() => {
    // In a real implementation, fetch user data, favorite videos, and saved courses
    // For now, we'll use mock data and a simulated loading delay
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        
        setTimeout(() => {
          // Mock data for demonstration
          const mockFavoriteVideos = [];
          const mockSavedCourses = [
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
          ];
          
          setFavoriteVideos(mockFavoriteVideos);
          setSavedCourses(mockSavedCourses);
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-32 text-center">
          <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">User Not Authenticated</h1>
          <p className="text-muted-foreground mb-6">
            Please login to view your profile.
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={`https://api.dicebear.com/6.x/lorelei/svg?seed=${user.name}`}
                        alt={user.name}
                      />
                      <AvatarFallback className="text-lg">
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription className="mt-1">{user.email}</CardDescription>
                  <div className="mt-3">
                    <Badge variant="secondary">
                      {user.role === "admin" ? "Administrator" : "Member"}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-2">
                      Joined {formatDate(new Date())}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="#settings">
                        <Settings className="mr-2 h-4 w-4" /> Account Settings
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-destructive hover:text-destructive"
                      onClick={logout}
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Log Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Tabs defaultValue="saved" className="w-full">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="saved" className="flex-1">
                    <BookOpen className="h-4 w-4 mr-2" /> Saved Courses
                  </TabsTrigger>
                  <TabsTrigger value="favorites" className="flex-1">
                    <Heart className="h-4 w-4 mr-2" /> Favorite Videos
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex-1">
                    <Clock className="h-4 w-4 mr-2" /> Watch History
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="saved">
                  {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Array.from({ length: 3 }).map((_, index) => (
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
                  ) : savedCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {savedCourses.map((course, index) => (
                        <CourseCard key={course.id} {...course} index={index} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No saved courses</h3>
                      <p className="text-muted-foreground mb-6">
                        You haven't saved any courses yet.
                      </p>
                      <Button asChild>
                        <a href="/courses">Browse Courses</a>
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="favorites">
                  {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="space-y-3">
                          <Skeleton className="h-48 w-full rounded-lg" />
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-6 w-full" />
                        </div>
                      ))}
                    </div>
                  ) : favoriteVideos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Favorite videos would go here */}
                      <p>Favorite videos</p>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No favorite videos</h3>
                      <p className="text-muted-foreground mb-6">
                        You haven't favorited any videos yet.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="history">
                  <div className="text-center py-12">
                    <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Watch history coming soon</h3>
                    <p className="text-muted-foreground">
                      This feature is currently under development.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 