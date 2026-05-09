"use client";

import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Calendar, Clock, User } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { useTranslations } from "next-intl";
import type { BlogPost } from "@/data/blog";

export default function PostsGrid({ posts }: { posts: BlogPost[] }) {
  const t = useTranslations("blog");

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-text-muted font-cairo">لا توجد مقالات في هذا القسم</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, i) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
        >
          <Link href={`/blog/${post.slug}`} className="block h-full group">
            <Card className="h-full flex flex-col overflow-hidden p-0" hover>
              {post.heroImage && (
                <div className="aspect-[16/10] overflow-hidden bg-surface-light">
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-col flex-1 p-6">
                <div className="mb-4">
                  <Badge variant="gold">{post.category}</Badge>
                </div>
                <h2 className="text-xl font-bold font-cairo text-text-primary mb-3 line-clamp-2 leading-relaxed group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="text-text-secondary text-sm font-cairo leading-relaxed mb-6 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-accent" />
                    <span className="text-xs text-text-secondary font-cairo">
                      {post.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      <span className="text-xs text-text-secondary font-cairo">
                        {formatDate(post.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-accent" />
                      <span className="text-xs text-text-secondary font-cairo">
                        {post.readingTime} {t("readingTime")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
