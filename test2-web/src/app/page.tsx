"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import MainLayout from "@/components/layout/MainLayout";
import { ArrowRight, Play, BookOpen, Star } from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-background">
        <div className="container px-4 py-32 mx-auto">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
            <motion.div
              className="flex flex-col justify-center"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1
                className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
                variants={fadeInUp}
              >
                Modern Education<br />
                <span className="text-primary">For Everyone</span>
              </motion.h1>
              <motion.p
                className="mt-6 text-lg text-muted-foreground max-w-lg"
                variants={fadeInUp}
              >
                High-quality educational video courses with a modern, minimalist approach.
                Expand your knowledge with our carefully curated content.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4 mt-8"
                variants={fadeInUp}
              >
                {user ? (
                  <Button asChild size="lg">
                    <Link href="/courses">
                      Browse Courses <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild size="lg">
                      <Link href="/auth/register">
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" asChild size="lg">
                      <Link href="/auth/login">Login</Link>
                    </Button>
                  </>
                )}
              </motion.div>
            </motion.div>
            <motion.div
              className="hidden lg:flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center">
                  <Play className="h-10 w-10 text-primary ml-1" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold sm:text-4xl">Why Choose TrueSpace?</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Our platform provides a unique learning experience with focus on quality and simplicity.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                icon: <BookOpen className="h-10 w-10 text-primary" />,
                title: "High-Quality Content",
                description:
                  "Professionally produced video lessons with clear explanations and practical examples.",
              },
              {
                icon: <Star className="h-10 w-10 text-primary" />,
                title: "Exclusive Access",
                description:
                  "Use promo codes to unlock premium courses and educational materials.",
              },
              {
                icon: <Play className="h-10 w-10 text-primary" />,
                title: "Modern Experience",
                description:
                  "Clean, distraction-free interface that puts the focus on your learning journey.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-card p-8 rounded-lg border border-border"
                variants={fadeInUp}
              >
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <motion.div
            className="bg-card border border-border p-12 rounded-lg text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold">Ready to Start Learning?</h2>
            <p className="mt-4 mb-8 text-muted-foreground">
              Join our platform today and get access to premium educational content.
            </p>
            {user ? (
              <Button size="lg" asChild>
                <Link href="/courses">
                  Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button size="lg" asChild>
                <Link href="/auth/register">
                  Create an Account <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
