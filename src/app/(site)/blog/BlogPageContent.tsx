"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, User } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import Breadcrumb from "@/components/shared/Breadcrumb";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
} as const;

export default function BlogPageContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/3 w-96 h-96 bg-primary/8 rounded-full blur-[150px]" />

        <Container className="relative z-10">
          <Breadcrumb items={[{ label: "المدونة" }]} />
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Badge variant="secondary">مقالات تقنية</Badge>
            <h1 className="text-h1 font-bold font-cairo gradient-text mt-6 mb-6">
              المدونة
            </h1>
            <p className="text-xl sm:text-2xl text-text-secondary font-tajawal leading-relaxed">
              مقالات ونصائح تقنية من فريق خبراء إتقان
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Blog Grid */}
      <section className="section-padding">
        <Container>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {blogPosts.map((post) => (
              <motion.div key={post.slug} variants={itemVariants}>
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <Card className="h-full flex flex-col" hover>
                    {/* Category */}
                    <div className="mb-4">
                      <Badge variant="accent">{post.category}</Badge>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold font-cairo text-text-primary mb-3 line-clamp-2 leading-relaxed">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-text-secondary text-sm font-tajawal leading-relaxed mb-6 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-text-muted" />
                        <span className="text-xs text-text-secondary font-tajawal">
                          {post.author}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-text-muted" />
                          <span className="text-xs text-text-secondary font-tajawal">
                            {formatDate(post.date)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-text-muted" />
                          <span className="text-xs text-text-secondary font-tajawal">
                            {post.readingTime} دقائق قراءة
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
    </>
  );
}
