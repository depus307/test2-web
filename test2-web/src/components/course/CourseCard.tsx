"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Star } from "lucide-react";
import { formatDuration } from "@/lib/utils";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  category: string;
  instructor: {
    name: string;
  };
  videosCount: number;
  totalDuration: number;
  isFeatured?: boolean;
  requiresPromoCode?: boolean;
  index?: number;
}

export default function CourseCard({
  id,
  title,
  description,
  thumbnailUrl,
  category,
  instructor,
  videosCount,
  totalDuration,
  isFeatured = false,
  requiresPromoCode = true,
  index = 0,
}: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/courses/${id}`}>
        <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 bg-card hover:bg-card/90">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
            {isFeatured && (
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-primary text-white">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <div className="flex flex-col space-y-2">
              <Badge variant="outline" className="w-fit">
                {category}
              </Badge>
              <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {description}
              </p>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <div className="text-sm text-muted-foreground">
              By <span className="font-medium">{instructor.name}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <div className="flex items-center">
                <BookOpen className="h-3.5 w-3.5 mr-1" />
                {videosCount} {videosCount === 1 ? "lesson" : "lessons"}
              </div>
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                {formatDuration(totalDuration)}
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
} 