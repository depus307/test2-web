"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { 
  UserIcon, 
  BookOpenIcon, 
  PlusIcon, 
  Pencil, 
  Trash, 
  TicketIcon, 
  CheckCircle2,
  XCircle
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default function AdminPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [promoCodes, setPromoCodes] = useState<any[]>([]);

  useEffect(() => {
    // In a real implementation, fetch data from the database
    // For now, we'll use mock data and a simulated loading delay
    const fetchAdminData = async () => {
      try {
        setIsLoading(true);
        
        setTimeout(() => {
          // Mock data for demonstration
          const mockUsers = [
            { 
              id: "1", 
              name: "John Doe", 
              email: "john@example.com", 
              role: "user", 
              createdAt: new Date(2023, 0, 15), 
              allowedAccess: true 
            },
            { 
              id: "2", 
              name: "Jane Smith", 
              email: "jane@example.com", 
              role: "user", 
              createdAt: new Date(2023, 1, 20), 
              allowedAccess: false 
            },
            { 
              id: "3", 
              name: "Admin User", 
              email: "admin@example.com", 
              role: "admin", 
              createdAt: new Date(2022, 11, 10), 
              allowedAccess: true 
            },
          ];
          
          const mockCourses = [
            {
              id: "1",
              title: "Introduction to Web Development",
              category: "Programming",
              videosCount: 12,
              createdAt: new Date(2023, 0, 10),
              requiresPromoCode: true,
            },
            {
              id: "2",
              title: "UI/UX Design Principles",
              category: "Design",
              videosCount: 8,
              createdAt: new Date(2023, 2, 5),
              requiresPromoCode: true,
            },
          ];

          const mockPromoCodes = [
            {
              id: "1",
              code: "LAUNCH2023",
              description: "Launch promo code",
              validUntil: new Date(2023, 11, 31),
              maxUses: 100,
              currentUses: 45,
              isActive: true,
              courses: ["1", "2"],
            },
            {
              id: "2",
              code: "SUMMER2023",
              description: "Summer special",
              validUntil: new Date(2023, 8, 30),
              maxUses: 50,
              currentUses: 50,
              isActive: false,
              courses: ["1"],
            },
          ];
          
          setUsers(mockUsers);
          setCourses(mockCourses);
          setPromoCodes(mockPromoCodes);
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (!user || user.role !== "admin") {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-32 text-center">
          <UserIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
          <p className="text-muted-foreground mb-6">
            You need administrator privileges to access this page.
          </p>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const handleDeleteUser = (userId: string) => {
    toast.success("User deleted successfully");
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleDeleteCourse = (courseId: string) => {
    toast.success("Course deleted successfully");
    setCourses(courses.filter(course => course.id !== courseId));
  };

  const handleDeletePromoCode = (promoCodeId: string) => {
    toast.success("Promo code deleted successfully");
    setPromoCodes(promoCodes.filter(code => code.id !== promoCodeId));
  };

  const togglePromoCodeStatus = (promoCodeId: string) => {
    setPromoCodes(promoCodes.map(code => 
      code.id === promoCodeId
        ? { ...code, isActive: !code.isActive }
        : code
    ));
    toast.success("Promo code status updated");
  };

  const handleGrantAccess = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId
        ? { ...user, allowedAccess: true }
        : user
    ));
    toast.success("Access granted to user");
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground mb-8">
            Manage users, courses, and promo codes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Users</CardTitle>
                <CardDescription>
                  Total registered users
                </CardDescription>
              </CardHeader>
              <CardContent className="text-4xl font-bold">
                {isLoading ? <Skeleton className="h-10 w-16" /> : users.length}
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Courses</CardTitle>
                <CardDescription>
                  Total available courses
                </CardDescription>
              </CardHeader>
              <CardContent className="text-4xl font-bold">
                {isLoading ? <Skeleton className="h-10 w-16" /> : courses.length}
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Promo Codes</CardTitle>
                <CardDescription>
                  Active promotional codes
                </CardDescription>
              </CardHeader>
              <CardContent className="text-4xl font-bold">
                {isLoading ? (
                  <Skeleton className="h-10 w-16" />
                ) : (
                  promoCodes.filter(code => code.isActive).length
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs defaultValue="users" className="w-full mt-6">
          <TabsList className="w-full mb-8">
            <TabsTrigger value="users" className="flex-1">
              <UserIcon className="h-4 w-4 mr-2" /> Users
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex-1">
              <BookOpenIcon className="h-4 w-4 mr-2" /> Courses
            </TabsTrigger>
            <TabsTrigger value="promocodes" className="flex-1">
              <TicketIcon className="h-4 w-4 mr-2" /> Promo Codes
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Manage Users</h2>
              <div className="flex gap-2">
                <div className="relative w-64">
                  <Input placeholder="Search users..." className="pl-8" />
                  <UserIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
                <Button>
                  <PlusIcon className="h-4 w-4 mr-2" /> Add User
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <Card>
                <Table>
                  <TableCaption>List of all registered users</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Access</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map(user => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {user.role === "admin" ? (
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                              Admin
                            </span>
                          ) : (
                            <span className="text-xs">User</span>
                          )}
                        </TableCell>
                        <TableCell>{formatDate(user.createdAt)}</TableCell>
                        <TableCell>
                          {user.allowedAccess ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleGrantAccess(user.id)}
                            >
                              Grant Access
                            </Button>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Manage Courses</h2>
              <div className="flex gap-2">
                <div className="relative w-64">
                  <Input placeholder="Search courses..." className="pl-8" />
                  <BookOpenIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
                <Button>
                  <PlusIcon className="h-4 w-4 mr-2" /> Add Course
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <Card>
                <Table>
                  <TableCaption>List of all courses</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Videos</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Requires Promo</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map(course => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell>{course.category}</TableCell>
                        <TableCell>{course.videosCount}</TableCell>
                        <TableCell>{formatDate(course.createdAt)}</TableCell>
                        <TableCell>
                          {course.requiresPromoCode ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost"
                              onClick={() => handleDeleteCourse(course.id)}
                            >
                              <Trash className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </TabsContent>

          {/* Promo Codes Tab */}
          <TabsContent value="promocodes">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Manage Promo Codes</h2>
              <div className="flex gap-2">
                <div className="relative w-64">
                  <Input placeholder="Search promo codes..." className="pl-8" />
                  <TicketIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
                <Button>
                  <PlusIcon className="h-4 w-4 mr-2" /> Add Promo Code
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <Card>
                <Table>
                  <TableCaption>List of all promo codes</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Valid Until</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {promoCodes.map(code => (
                      <TableRow key={code.id}>
                        <TableCell className="font-medium">{code.code}</TableCell>
                        <TableCell>{code.description}</TableCell>
                        <TableCell>{formatDate(code.validUntil)}</TableCell>
                        <TableCell>
                          {code.maxUses > 0 
                            ? `${code.currentUses}/${code.maxUses}` 
                            : `${code.currentUses} (unlimited)`}
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant={code.isActive ? "default" : "secondary"}
                            onClick={() => togglePromoCodeStatus(code.id)}
                          >
                            {code.isActive ? "Active" : "Inactive"}
                          </Button>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost"
                              onClick={() => handleDeletePromoCode(code.id)}
                            >
                              <Trash className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
} 